import { useContext } from "react";
import { PriceList } from "../PriceList/PriceList";
import SelectAutoWidth from "../Select/Select";
import "./Main.scss";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { HomeContext } from "../../providers/context/HomeProvider/HomeContext";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WaterIcon from '@mui/icons-material/Water';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

type Props = {
  createPortal: () => void;
  setIsOpen: (isOpen: boolean) => void;
};

export const Main = ({createPortal, setIsOpen}:Props) => {
  const {
    hotCounter,
    coldCounter,
    electricityCounter,
    drainageCounter,
    deltaHot,
    deltaCold,
    deltaElectricity,
    deltaDrainage,
    sum,
    value,
    logout,
    fetchDelete,
  } = useContext(HomeContext);
  // const {createPortal,}= useContext(ModalContext)
  return (<>
    <section className="container">
      <div className="calc">
        <div className="calc__period">
          <IconButton onClick={logout} >
            <LogoutIcon color="primary" />
          </IconButton>

          <div className="calc__period">
            <IconButton
              onClick={() => {
                createPortal!();
                setIsOpen(true)
              }}
              
            >
              <AddCircleOutlineOutlinedIcon  color="primary"/>
            </IconButton>
            <IconButton onClick={() => {
                fetchDelete!();
              }} aria-label="delete">
        <DeleteIcon  color="primary"/>
      </IconButton>
            <p>Выберите период:</p>
            <SelectAutoWidth />
          </div>
        </div>
        <table>
          <tr>
            <td></td>
            <th>Горячая вода <WaterDropIcon fontSize="small"  color="action" /></th>
            <th>Холодная вода <WaterDropIcon fontSize="small" color="primary"/></th>
            <th>Водоотвод <WaterIcon fontSize="small" color="primary"/></th>
            <th>Электричество <ElectricBoltIcon fontSize="small"/></th>
          </tr>
          <tr>
            <th>Показания:</th>
            <td>{hotCounter}</td>
            <td>{coldCounter}</td>
            <td>{drainageCounter}</td>
            <td>{electricityCounter}</td>
          </tr>
          <tr>
            <th>Расход:</th>
            <td>{deltaHot}</td>
            <td>{deltaCold}</td>
            <td>{deltaDrainage}</td>
            <td>{deltaElectricity}</td>
          </tr>
        </table>
        <div className="calc__money">
          <p>Сумма за месяц:</p>
          {value === "" ? null : (
            <>
              <p>{sum} руб</p>
            </>
          )}
        </div>
      </div>
      <div className="price">
        <PriceList />
      </div>
    </section>
   </>
  );
};
