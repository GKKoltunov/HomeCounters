import { useContext } from "react";
import { PriceList } from "../PriceList/PriceList";
import SelectAutoWidth from "../Select/Select";
import "./Main.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { HomeContext } from "../../providers/context/HomeProvider/HomeContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

type Props = {
  createPortal: () => void;
  setIsOpen: (isOpen: boolean) => void;
};
export const Main = ({ createPortal, setIsOpen }: Props) => {
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

  return (
    <section className="container">
      <div className="calc">
        <div className="calc__period">
          <button onClick={logout} className="logout">
            <LogoutIcon />
          </button>

          <div className="calc__period">
            <button
              onClick={() => {
                setIsOpen(true);
                createPortal();
              }}
              className="logout"
            >
              <AddCircleOutlineOutlinedIcon />
            </button>
            <button
              className="logout"
              onClick={() => {
                fetchDelete!();
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </button>
            <p>Выберите период:</p>
            <SelectAutoWidth />
          </div>
        </div>
        <table>
          <tr>
            <td></td>
            <th>Горячая вода ♨️</th>
            <th>Холодная вода 💧</th>
            <th>Водоотвод 🚿</th>
            <th>Электричество 💡</th>
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
  );
};
