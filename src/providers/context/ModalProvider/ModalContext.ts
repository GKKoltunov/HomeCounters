import { createContext } from "react";


interface TypeContext {
  changeHot?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  changeCold?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  changeElectric?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  newPeriod?: () => void;
  changePeriod?:(event: React.FormEvent<HTMLFormElement>) => void;
  portal?: Element | DocumentFragment;
  isOpen?: boolean;
  createPortal?: () => void;
  
}

const defaultState = {};
export const ModalContext = createContext<TypeContext>(defaultState);