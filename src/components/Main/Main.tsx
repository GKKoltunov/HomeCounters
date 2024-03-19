import { useContext } from "react";
import { PriceList } from "../PriceList/PriceList";
import SelectAutoWidth from "../Select/Select";
import "./Main.scss";

import { HomeContext } from "../../providers/context/HomeProvider/HomeContext";

export const Main = () => {
  const {
    hotCounter,
    coldCounter,
    electricityCounter,
    drainageCounter,
    deltaHot,
    deltaCold,
    deltaElectricity,
    deltaDrainage,
    sum,
    value,
   
  } = useContext(HomeContext);

  return (
    <section className="container">
      <div className="calc">
        <div className="calc__period">
          <p>Выберите период:</p>
          <SelectAutoWidth />
        </div>
        <div className="calc__data">
          <div className="calc__data-value">
            <p>Горячая вода ♨️</p>
            {value === "" ? null : (
              <>
                <p>{hotCounter}</p>
                <p>{deltaHot}</p>
              </>
            )}
          </div>
          <div className="calc__data-value">
            <p>Холодная вода 💧</p>
            {value === "" ? null : (
              <>
                <p>{coldCounter}</p>
                <p>{deltaCold}</p>
              </>
            )}
          </div>
          <div className="calc__data-value">
            <p>Водоотвод 🚿</p>
            {value === "" ? null : (
              <>
                <p>{drainageCounter}</p>
                <p>{deltaDrainage}</p>
              </>
            )}
          </div>
          <div className="calc__data-value">
            <p>Электричество 💡</p>
            {value === "" ? null : (
              <>
                <p>{electricityCounter}</p>
                <p>{deltaElectricity}</p>
              </>
            )}
          </div>
        </div>
        <div className="calc__money">
          <p>Сумма за месяц:</p>
          {value === "" ? null : (
            <>
              <p>{sum},руб</p>
            </>
          )}
        </div>
      </div>
      <div className="price">
        <PriceList />
      </div>
    </section>
  );
};
