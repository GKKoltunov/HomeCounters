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

export const Modal = ({ setIsOpen }:Props) => {
  // const {
  //   changeHot,
  //   changeCold,
  //   changeElectric,
  //   newPeriod,
  //   contentWrap,
  //   portal,

  // } = useContext(ModalContext);

  const { fetchPrice } = useContext(HomeContext);
  const [hot, setHot] = useState("");
  const [cold, setCold] = useState("");
  const [drainage, setDrainage] = useState("");
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

  function newPeriod(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setDrainage((+hot + +cold).toString());
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
          changeElectric={changeElectric!}
          changeCold={changeCold!}
          changeHot={changeHot!}
          setValue={newPeriod!}
        />
      </div>
    </section>,
    portal!
  );
};
