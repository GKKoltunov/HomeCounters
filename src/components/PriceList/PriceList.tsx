import "./PriceList.scss";
import { useContext } from "react";
import { HomeContext } from "../../providers/context/HomeProvider/HomeContext";

export const PriceList = () => {
  const { list } = useContext(HomeContext);
  return (
    <>
      <h3 className="price__heading">Прайс лист</h3>
      <article className="price__article">
        <p className=" price__p">Холодная вода: {list!.price.cold} руб/куб.м</p>
        <p className=" price__p">Горячая вода: {list!.price.hot} руб/кВт</p>
        <p className=" price__p">
          Арендная плата: {list!.price.rent} руб/месяц
        </p>
        <p className=" price__p">Интернет: {list!.price.internet} руб/месяц</p>
        <p className=" price__p">Электричествo: {list!.price.electricity} руб/месяц</p>
      </article>
    </>
  );
};
