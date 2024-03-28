// import { ReactNode, useState } from "react";
// import { useContext, useEffect } from "react";
// import React from "react";
// import api from "../../../api";
// import { HomeContext } from "../HomeProvider/HomeContext";
// import { ModalContext } from "./ModalContext";

// type Children = {
//   children: ReactNode;
// };

// export const ModalProvider = ({ children }: Children) => {
//   const { fetchPrice } = useContext(HomeContext);
//   const [hot, setHot] = useState("");
//   const [cold, setCold] = useState("");
//   const [drainage, setDrainage] = useState("");
//   const [electricity, setElectricity] = useState("");

//   const portal = document.getElementById("portal")!;
//   const contentWrap = React.createRef();
//   const [isOpen, setIsOpen] = useState(false);
  
//   function createPortal() {
//     const portal = document.createElement("div");
//     portal.id = "portal";
//     document.body.append(portal);
//     setIsOpen(true)
//   }
//   function closeModal(event: MouseEvent) {
//     if (contentWrap.current && !contentWrap.current.contains(event.target)) {
//       setIsOpen(false);
//       portal?.remove();
//     }
//   }

//   useEffect(() => {
//     document.addEventListener("mousedown", closeModal);
//     return () => {
//       document.removeEventListener("mousedown", closeModal);
//     };
//   }, [contentWrap]);
//   const date = new Date().toISOString();

//   async function fetchPeriod() {
//     try {
//       await api.newPeriod({
//         date: date,
//         hot: hot,
//         drainage: drainage,
//         electricity: electricity,
//         cold: cold,
//       });
//     } catch (e) {
//       console.log(e);
//       return;
//     }
//   }

//   function changeHot(
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) {
//     setHot(e.target.value);
//   }

//   function changeCold(
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) {
//     setCold(e.target.value);
//   }

//   function changeElectric(
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) {
//     setElectricity(e.target.value);
//   }

//   function newPeriod(event: React.FormEvent<HTMLFormElement>) {
//     event?.preventDefault();
//     setDrainage((+hot + +cold).toString());
//     setIsOpen(false);
//     portal?.remove();
//     fetchPeriod();
//     fetchPrice!();
//   }
//     return (
//       <ModalContext.Provider
//         value={{
//           changeHot,
//           changeCold,
//           changeElectric,
//           newPeriod,
//           contentWrap,
//           portal,
//           isOpen,
//           createPortal,
//         }}
//       >
//         {children}
//       </ModalContext.Provider>
//     );
//   }

