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
import { default as FormDialog } from '../Modal/Modal';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';

const ADDHEADING = 'Внесите новые показания';
const EDITHEADING = 'Внесите изменения в показания';

export const Main = () => {
  const {
    calc,
    hotCounter,
    coldCounter,
    electricityCounter,
    value,
    logout,
    fetchDelete,
  } = useContext(HomeContext);

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
              <Typography variant='h6'>Выберите период:</Typography>
              <SelectAutoWidth />
            </div>
          </div>
          <table>
            <tbody>
              <tr>
                <td></td>
                <th>
                  Горячая вода{' '}
                  <WaterDropIcon
                    className="icon"
                    fontSize="small"
                    sx={{ color: red[500] }}
                  />
                </th>
                <th>
                  Холодная вода{' '}
                  <WaterDropIcon
                    className="icon"
                    fontSize="small"
                    color="primary"
                  />
                </th>
                <th>
                  Водоотвод{' '}
                  <WaterIcon
                    className="icon"
                    fontSize="small"
                    color="primary"
                  />
                </th>
                <th>
                  Электричество{' '}
                  <ElectricBoltIcon
                    className="icon"
                    fontSize="small"
                    sx={{ color: yellow[500] }}
                  />
                </th>
              </tr>
              <tr>
                <th>Показания:</th>
                <td>{(calc && calc.hotCounter) || ''}</td>
                <td>{(calc && calc.coldCounter) || ''}</td>
                <td>{(calc && calc.drainageCounter) || ''}</td>
                <td>{(calc && calc.electricityCounter) || ''}</td>
              </tr>
              <tr>
                <th>Расход:</th>
                <td>{(calc && calc.deltaHot) || ''}</td>
                <td>{(calc && calc.deltaCold) || ''}</td>
                <td>{(calc && calc!.deltaDrainage) || ''}</td>
                <td>{(calc && calc!.deltaElectricity) || ''}</td>
              </tr>
            </tbody>
          </table>
          <div className="calc__money">
            <Typography variant="h6">Сумма за месяц:</Typography>
            {value === '' ? null : (
              <>
                <Typography variant='body1'>{calc && calc.sum} рублей</Typography>
              </>
            )}
          </div>
        </div>
        <div className="price">
          <PriceList />
        </div>
      </section>
      <AlertDialog
        handleClose={handleClose}
        open={open}
        fetchDelete={fetchDelete}
      />
      {addOpen && (
        <FormDialog
          title={ADDHEADING}
          typeOfAction="add"
          open={addOpen}
          closeAdd={closeAdd}
        />
      )}
      {editOpen && (
        <FormDialog
          title={EDITHEADING}
          typeOfAction="edit"
          open={editOpen}
          closeAdd={closeEdit}
          initState={{
            hot: hotCounter || '',
            cold: coldCounter || '',
            electricity: electricityCounter || '',
          }}
        />
      )}
    </>
  );
};
