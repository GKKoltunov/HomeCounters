import { createContext } from "react";


interface TypeContext {
  changeHot?: (
   value:string
  ) => void;
  changeCold?: (
    value:string
  ) => void;
  changeElectric?: (
    value:string
  ) => void;
  newPeriod?: () => void;
  changePeriod?:() => void;
  portal?: Element | DocumentFragment;
  isOpen?: boolean;
  createPortal?: () => void;
  hot:string;
  cold:string;
   electricity:string;
   drainage:string;
}

const defaultState = {hot:'',cold:'', electricity:'', drainage:''}
  
export const ModalContext = createContext<TypeContext>(defaultState);