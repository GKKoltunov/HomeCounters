import { HomeContext } from "./HomeContext";
import { useEffect, useState } from "react";
import api from "../../../api";
import { SelectChangeEvent } from "@mui/material/Select";
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

  async function fetchPrice() {
    // загрузка данных для авторизванного пользователя
    try {
      const res = await api.getPrice();
      setList(res);
      console.log(res);
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
  const deltaDrainage = +hotCounter - +preMonth?.hot;

  const sum =
    deltaHot * +price.hot +
    deltaCold * +price.cold +
    deltaElectricity * +price.electricity +
    deltaDrainage * +price.drainage +
    +price.rent;

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
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
