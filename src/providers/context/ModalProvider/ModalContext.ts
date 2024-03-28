import { LegacyRef, RefObject, createContext } from "react";

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
  newPeriod?: (event: React.FormEvent<HTMLFormElement>) => void;
  contentWrap?: LegacyRef<HTMLDivElement> | RefObject<HTMLDivElement>;
  portal?: Element | DocumentFragment;
  isOpen?: boolean;
  createPortal?: () => void;
  contains?:()=>void;
}

const defaultState = {};
export const ModalContext = createContext<TypeContext>(defaultState);