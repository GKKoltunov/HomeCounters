import { createContext } from "react";;

interface TypeContext {
  setLogin?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setPassword?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  fetchLogin?: () => void;
  cookies?: Object;
  rent?: number;
  hot?: number;
  cold?: number;
  internet?: number;
  electricity?: number;
  periods?: Array<any>;
}

const defaultState = { }

export const FormContext = createContext<TypeContext>(defaultState)