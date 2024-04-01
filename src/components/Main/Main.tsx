import { useContext } from 'react';
import { PriceList } from '../PriceList/PriceList';
import SelectAutoWidth from '../Select/Select';
import './Main.scss';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { HomeContext } from '../../providers/context/HomeProvider/HomeContext';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WaterIcon from '@mui/icons-material/Water';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { red } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';
import { default as AlertDialog } from '../Alert/Alert';
import { useState } from 'react';
import { ModalContext } from '../../providers/context/ModalProvider/ModalContext';
import { default as FormDialog } from '../Modal/Modal';
import EditIcon from '@mui/icons-material/Edit';

export const Main = () => {
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

  const { changeHot, changeCold, changeElectric, newPeriod, changePeriod } =
    useContext(ModalContext);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [addOpen, setAddOpen] = useState(false);
  const openAdd = () => {
    setAddOpen(true);
  };
  const closeAdd = () => {
    setAddOpen(false);
  };

  const [editOpen, setEditOpen] = useState(false);
  const openEdit = () => {
    setEditOpen(true);
  };
  const closeEdit = () => {
    setEditOpen(false);
  };

  const ADDHEADING = 'Внесите новые показания';
  const EDITHEADING = 'Внесите изменения в показания';

  return (
    <>
      <section className="container">
        <div className="calc">
          <div className="calc__period">
            <IconButton className="btn" onClick={logout}>
              <span className="tooltip">Выход из аккаунта</span>
              <LogoutIcon color="primary" />
            </IconButton>

            <div className="calc__period">
              <IconButton className="btn" onClick={openEdit}>
                <span className="tooltip">Изменить показания</span>
                <EditIcon color="primary" />
              </IconButton>

              <IconButton className="btn" onClick={openAdd}>
                <span className="tooltip">Добавить показания</span>
                <AddCircleOutlineOutlinedIcon color="primary" />
              </IconButton>
              <IconButton
                className="btn"
                onClick={handleClickOpen}
                aria-label="delete"
              >
                <span className="tooltip">Удалить показания</span>
                <DeleteIcon color="primary" />
              </IconButton>
              <p>Выберите период:</p>
              <SelectAutoWidth />
            </div>
          </div>
          <table>
            <tbody>
              <tr>
                <td></td>
                <th>
                  Горячая вода{' '}
                  <WaterDropIcon fontSize="small" sx={{ color: red[500] }} />
                </th>
                <th>
                  Холодная вода{' '}
                  <WaterDropIcon fontSize="small" color="primary" />
                </th>
                <th>
                  Водоотвод <WaterIcon fontSize="small" color="primary" />
                </th>
                <th>
                  Электричество{' '}
                  <ElectricBoltIcon
                    fontSize="small"
                    sx={{ color: yellow[500] }}
                  />
                </th>
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
            </tbody>
          </table>
          <div className="calc__money">
            <p>Сумма за месяц:</p>
            {value === '' ? null : (
              <>
                <p>{sum} руб</p>
              </>
            )}
          </div>
        </div>
        <div className="price">
          <PriceList />
        </div>

        <FormDialog
          title={EDITHEADING}
          changeHot={changeHot}
          changeCold={changeCold}
          changeElectric={changeElectric}
          action={changePeriod!}
          open={editOpen}
          closeAdd={closeEdit}
        />
      </section>
      <AlertDialog
        handleClose={handleClose}
        open={open}
        fetchDelete={fetchDelete}
      />
      <FormDialog
        title={ADDHEADING}
        changeHot={changeHot}
        changeCold={changeCold}
        changeElectric={changeElectric}
        action={newPeriod!}
        open={addOpen}
        closeAdd={closeAdd}
      />
    </>
  );
};
