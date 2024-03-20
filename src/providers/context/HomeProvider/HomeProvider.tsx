import { HomeContext } from "./HomeContext";
import { useEffect, useState } from "react";
import api from "../../../api";
import { SelectChangeEvent } from "@mui/material/Select";
import { removeCookie } from "typescript-cookie";
import { useNavigate } from "react-router-dom";
type Children = {
  children: any;
};

export const HomeProvider = ({ children }: Children) => {
  const [list, setList] = useState({
    price: {
      cold: "",
      hot: "",
      internet: "",
      electricity: "",
      drainage: "",
      rent: "",
      _id: "",
    },
    period: [
      { _id: "", date: "", cold: "", hot: "", electricity: "", drainage: "" },
    ],
  });
  const [value, setValue] = useState("");
  const [currentID, setcurrentID] = useState("");
  const [currentMonth, setCurrentMonth] = useState(list.period[0]);
  const navigate = useNavigate();

  const preIndex = list.period.indexOf(currentMonth);
  const preMonth = list.period[preIndex + 1];
  const price = list.price;

  const hotCounter = currentMonth?.hot;
  const coldCounter = currentMonth?.cold;
  const electricityCounter = currentMonth?.electricity;
  const drainageCounter = currentMonth?.drainage;

  const deltaHot = +hotCounter - +preMonth?.hot;
  const deltaCold = +coldCounter - +preMonth?.cold;
  const deltaElectricity = +hotCounter - +preMonth?.hot;
  const deltaDrainage = deltaHot + deltaCold;

  const sum =
    deltaHot * +price.hot +
    deltaCold * +price.cold +
    deltaElectricity * +price.electricity +
    deltaDrainage * +price.drainage +
    +price.rent;

  async function fetchPrice() {
    // загрузка данных для авторизванного пользователя
    try {
      const res = await api.getPrice();
      setList(res);
      setValue(res.period[0].date);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchDelete() {
    try {
      await api.deletePeriod({
        id: currentID,
      });
      fetchPrice();
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    //изменение значения селект
    setValue(event.target.value);
  };

  function findID() {
    //находим id выбранного периода

    if (list.period.length !== 0) {
      let periods = list.period;
      let currentElem = periods.find((el) => Object.values(el).includes(value));
      setcurrentID(currentElem?._id!);
      setCurrentMonth(currentElem!);
    }
  }

  function logout() {
    //удаляем куки/выходим из аккаунта
    removeCookie("userToken");
    navigate("/login");
  }

  useEffect(() => {
    fetchPrice();
  }, []);

  useEffect(() => {
    findID();
  }, [value]);

  return (
    <HomeContext.Provider
      value={{
        fetchPrice,
        list,
        value,
        handleChange,
        findID,
        hotCounter,
        coldCounter,
        electricityCounter,
        drainageCounter,
        deltaHot,
        deltaCold,
        deltaElectricity,
        deltaDrainage,
        sum,
        logout,
        fetchDelete,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
