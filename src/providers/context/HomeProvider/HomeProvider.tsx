import { HomeContext } from "./HomeContext";
import { ReactNode, useEffect, useMemo, useState } from "react";
import api from "../../../api";
import { SelectChangeEvent } from "@mui/material/Select";
import { removeCookie } from "typescript-cookie";
import { useNavigate } from "react-router-dom";
type Children = {
  children: ReactNode;
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


  const hotCounter = currentMonth?.hot;
  const coldCounter = currentMonth?.cold;
  const electricityCounter = currentMonth?.electricity;
  const drainageCounter = currentMonth?.drainage;
    
  let deltaHot;
  let deltaCold;
  let deltaElectricity;
  let deltaDrainage;
  let sum;

 function math(){
  const preIndex = list.period.findIndex((element)=>element._id===currentID);
  const preMonth = list.period[preIndex + 1];
  const price = list.price;

   deltaHot = +hotCounter - +preMonth?.hot;
   deltaCold = +coldCounter - +preMonth?.cold;
   deltaElectricity = +electricityCounter - +preMonth?.electricity;
   deltaDrainage = deltaHot + deltaCold;

   sum =
    deltaHot * +price.hot +
    deltaCold * +price.cold +
    deltaElectricity * +price.electricity +
    deltaDrainage * +price.drainage +
    +price.rent
 }
    
 const calc = useMemo(()=>math(),[currentMonth])
 


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
      if (currentID) {
        await api.deletePeriod({
          id: currentID,
        });
        fetchPrice();
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    //изменение значения селект
    setValue(event.target.value);
    calc    
  };

  function findID() {
    //находим id выбранного периода
    if (list.period.length !== 0) {
      let periods = list.period;
      let currentElem = periods.find((el) => el.date === value);
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

  useEffect(()=>{
    findID()
  },[value])

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
