import { HomeContext } from './HomeContext';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import api from '../../../api';
import { SelectChangeEvent } from '@mui/material/Select';
import { removeCookie } from 'typescript-cookie';
import { useNavigate } from 'react-router-dom';
type Children = {
  children: ReactNode;
};

export interface List {
  price: Price;
  period: Array<Period>;
}

export interface Period {
  _id?: string;
  date?: string;
  cold?: string;
  hot: string;
  electricity: string;
  drainage: string;
}

export interface Price {
  cold: string;
  hot: string;
  internet: string;
  electricity: string;
  drainage: string;
  rent: string;
  _id: string;
}

export const HomeProvider = ({ children }: Children) => {
  const [list, setList] = useState<List>({
    price: {
      cold: '',
      hot: '',
      internet: '',
      electricity: '',
      drainage: '',
      rent: '',
      _id: '',
    },
    period: [
      { _id: '', date: '', cold: '', hot: '', electricity: '', drainage: '' },
    ],
  });

  const [value, setValue] = useState('');
  const [currentID, setCurrentID] = useState('');
  const [currentMonth, setCurrentMonth] = useState(list.period[0]);
  const [hotCounter, setHotCounter] = useState('');
  const [coldCounter, setColdCounter] = useState('');
  const [electricityCounter, setElectricityCounter] = useState('');
  const [drainageCounter, setDrainageCounter] = useState('');
  const navigate = useNavigate();


  function mathDeltaSum() {
    const preIndex = list.period.findIndex(
      (element) => element._id === currentID
    );
    const preMonth = list.period[preIndex + 1];
    const price = list.price;

    const deltaHot = +hotCounter - +preMonth?.hot;
    const deltaCold =
      coldCounter && preMonth?.cold ? +coldCounter - +preMonth?.cold : 0;
    const deltaElectricity = +electricityCounter - +preMonth?.electricity;
    const deltaDrainage = deltaHot + deltaCold;

    const sum =
      deltaHot * +price.hot +
      deltaCold * +price.cold +
      deltaElectricity * +price.electricity +
      deltaDrainage * +price.drainage +
      +price.rent;

    return {
      hotCounter: hotCounter,
      coldCounter: coldCounter,
      electricityCounter: electricityCounter,
      drainageCounter: drainageCounter,
      deltaHot: deltaHot,
      deltaCold: deltaCold,
      deltaDrainage: deltaDrainage,
      deltaElectricity: deltaElectricity,
      sum: sum,
    };
  }

  const calc = useMemo(() => mathDeltaSum(), [currentMonth, list]);

  async function fetchPrice() {
    // загрузка данных для авторизoванного пользователя
    try {
      const res: List = await api.getPrice();
      setList(res);
      setValue(res.period[0].date || '');
      let currentElem = res.period.find((el) => el.date === value);
      setCurrentID(currentElem?._id || '');
      currentElem && setCurrentMonth(currentElem);
      setColdCounter(res.period[0].cold!);
      setHotCounter(res.period[0].hot!);
      setDrainageCounter(res.period[0].drainage!);
      setElectricityCounter(res.period[0].electricity!);
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
    
  };

  function findID() {
    //находим id выбранного периода
    if (list.period.length !== 0) {
      let periods = list.period;
      let currentElem = periods.find((el) => el.date === value);
      setCurrentID(currentElem?._id!);
      setCurrentMonth(currentElem!);
      setColdCounter(currentElem!.cold!);
      setHotCounter(currentElem!.hot!);
      setDrainageCounter(currentElem!.drainage!);
      setElectricityCounter(currentElem!.electricity!);
    }
  }

  function logout() {
    //удаляем куки/выходим из аккаунта
    removeCookie('userToken');
    navigate('/login');
  }

  useEffect(() => {
    fetchPrice();
  }, []);

  useEffect(() => {
    findID();
  }, [value]);

  return (
    <>
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
          calc,
          logout,
          fetchDelete,
          currentID,
        }}
      >
        {children}
      </HomeContext.Provider>
    </>
  );
};
