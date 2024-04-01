import { ReactNode, useState } from 'react';
import { useContext } from 'react';
import React from 'react';
import api from '../../../api';
import { HomeContext } from '../HomeProvider/HomeContext';
import { ModalContext } from './ModalContext';

type Children = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: Children) => {
  const { fetchPrice, currentID, value } = useContext(HomeContext);
  const [hot, setHot] = useState('');
  const [cold, setCold] = useState('');
  const [drainage, setDrainage] = useState('');
  const [electricity, setElectricity] = useState('');
  const date = new Date().toISOString();

  async function fetchPeriod() {
    try {
      await api.newPeriod({
        date: date,
        hot: hot,
        drainage: drainage,
        electricity: electricity,
        cold: cold,
      });
      fetchPrice!()
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async function fetchChange() {
    try {
      if(currentID){
      await api.changePeriod({
        hot: hot,
        cold: cold,
        electricity: electricity,
        drainage: +hot + +cold,
        id: currentID!,
        date: value,
      })};
      fetchPrice!()
    } catch (e) {
      console.log(e);
      return;
    }
  }

  function changeHot(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setHot(e.target.value);
  }

  function changeCold(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setCold(e.target.value);
  }

  function changeElectric(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setElectricity(e.target.value);
  }

  function newPeriod() {
    setDrainage((+hot + +cold).toString());
    fetchPeriod();
    
  }

  function changePeriod() {
    setDrainage((+hot + +cold).toString());
    fetchChange();
    
  }
  return (
    <ModalContext.Provider
      value={{
        changeHot,
        changeCold,
        changeElectric,
        newPeriod,
        changePeriod,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
