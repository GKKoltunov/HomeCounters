import { createContext } from "react";;

interface TypeContext {
  SetLogin?: () => void;
  SetPassword?: () => void;
  fetchLogin?: () => void;
  cookies?: Object;
  rent?: number;
  hot?: number;
  cold?: number;
  internet?: number;
  electricity?: number;
  periods?:Array<any>;
}

const defaultState = { }

export const FormContext = createContext<TypeContext>(defaultState)