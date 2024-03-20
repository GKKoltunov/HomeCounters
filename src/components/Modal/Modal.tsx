import "./Modal.scss";
import ReactDOM from "react-dom";
import Input from "../Input/Input";
import { useContext, useEffect, useState } from "react";
import React from "react";
import api from "../../api/";
import { HomeContext } from "../../providers/context/HomeProvider/HomeContext";
type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

type Elem = {
  contentWrap?: HTMLElement;
  current: null | any;
};

export const Modal = ({ setIsOpen }: Props) => {
  const {fetchPrice} = useContext(HomeContext)
  const [hot, setHot] = useState("");
  const [cold, setCold] = useState("");
  const [drainage, setDrainage] = useState('');
  const [electricity, setElectricity] = useState("");

  const portal = document.getElementById("portal")!;
  const contentWrap: Elem = React.createRef();
 
  function closeModal(event: MouseEvent) {
    if (contentWrap.current && !contentWrap.current.contains(event.target)) {
      setIsOpen(false);
      portal?.remove();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
    
  }, [contentWrap]);
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
      
    } catch (e) {
      console.log(e);
      return
    }
  }

  const hotInput = document.getElementById("hot") as HTMLInputElement;
  const coldInput = document.getElementById("cold") as HTMLInputElement;
  const electricityInput = document.getElementById(
    "electricity"
  ) as HTMLInputElement;

  function changeHot() {
    setHot(hotInput?.value);

  }

  function changeCold() {
    setCold(coldInput?.value);
  }

  function changeElectric() {
    setElectricity(electricityInput?.value);
  }

  function newPeriod(event:any) {
    event?.preventDefault();
    setDrainage((+hot+ +cold).toString());
    setIsOpen(false);
    portal?.remove();
    fetchPeriod();
    fetchPrice!();
    
    
  }

  return ReactDOM.createPortal(
    <section className="modal">
      <div className="modal__content" id="modal__content" ref={contentWrap}>
        <h1>Заполните показания</h1>

        <Input
          changeElectric={changeElectric}
          changeCold={changeCold}
          changeHot={changeHot}
          setValue={newPeriod}
        />
      </div>
    </section>,
    portal
  );
};
