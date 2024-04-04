import './PriceList.scss';
import { useContext } from 'react';
import { HomeContext } from '../../providers/context/HomeProvider/HomeContext';
import { Typography } from '@mui/material';

export const PriceList = () => {
  const { list } = useContext(HomeContext);
  return (
    <>
      <Typography variant="h5" align="center" fontWeight={600}>
        Прайс лист
      </Typography>
      <article className="price__article">
        <Typography variant="body1">
          Холодная вода: {list!.price.cold} руб/куб.м
        </Typography>
        <Typography variant="body1">
          Горячая вода: {list!.price.hot} руб/куб.м
        </Typography>
        <Typography variant="body1">
          Арендная плата: {list!.price.rent} руб/месяц
        </Typography>
        <Typography variant="body1">
          Интернет: {list!.price.internet} руб/месяц
        </Typography>
        <Typography variant="body1">
          Электричествo: {list!.price.electricity} руб/кВт
        </Typography>
      </article>
    </>
  );
};
