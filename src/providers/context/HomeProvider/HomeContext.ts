import { createContext } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { List, Period } from "./HomeProvider";


interface TypeContext {
  list?: List;
  fetchPrice?: () => Object;
  fetchDelete?: () => Object;
  value?: string;
  handleChange?: (event: SelectChangeEvent) => void;
  findID?: () => void;
  currentID?: string;
  currentMonth?: Object;
  currentElem?: Period;
  hotCounter?: string ;
  coldCounter?: string ;
  electricityCounter?: string ;
  drainageCounter?: string | number;
  deltaHot?: number | string;
  deltaCold?: number | string;
  deltaElectricity?: number | string;
  deltaDrainage?: number | string;
  sum?: number | string;
  logout?: () => void;
  calc?:Calc;
}

interface Calc {
  deltaHot :number;
   deltaCold :number;
  deltaDrainage:number;
  deltaElectricity:number;
   sum:number;
   hotCounter?: string ;
  coldCounter?: string ;
  electricityCounter?: string ;
  drainageCounter?: string | number;
}

const defaultState = {};
export const HomeContext = createContext<TypeContext>(defaultState);
