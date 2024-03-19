import { createContext } from "react";
import { SelectChangeEvent } from "@mui/material/Select";


interface TypeContext {
  list?: {
    price: Price;
    period: Array<{
      _id: string;
      date: string;
      cold: string;
      hot: string;
      electricity: string;
      drainage: string;
    }>;
  };
  fetchPrice?: () => void;
  value?: string;
  handleChange?: (event: SelectChangeEvent) => void;
  findID?: () => void;
  currentID?: string;
  currentMonth?: Object;
  currentElem?: Period;
  hotCounter?: string | number;
  coldCounter?: string | number;
  electricityCounter?: string | number;
  drainageCounter?: string | number;
  deltaHot?: number | string;
  deltaCold?: number | string;
  deltaElectricity?: number | string;
  deltaDrainage?: number | string;
  sum?: number | string;
}


interface Period {
  find(arg0: (el: any) => any): unknown;
  map(arg0: (el: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  _id: string;
  date: string;
  cold: string;
  hot: string;
  electricity: string;
  drainage: string;
}

interface Price {
  cold: string;
  hot: string;
  internet: string;
  electricity: string;
  drainage: string;
  rent: string;
  _id: string;
}

const defaultState = {};
export const HomeContext = createContext<TypeContext>(defaultState);
