import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { ModalContext } from '../../providers/context/ModalProvider/ModalContext';

type Props = {
  typeOfAction?: string;
  closeAdd?: () => void;
  open?: boolean;
  title: string | number;
  initState?: { hot: string; cold: string; electricity: string };
};

export default function FormDialog({
  closeAdd,
  open,
  typeOfAction,
  title,
  initState,
}: Props) {
  const {
    changeHot,
    changeCold,
    changeElectric,
    hot,
    cold,
    electricity,
    newPeriod,
    changePeriod,
  } = React.useContext(ModalContext);

  React.useEffect(() => {
    if (initState) {
      changeCold && changeCold(initState.cold);
      changeHot && changeHot(initState.hot);
      changeElectric && changeElectric(initState.electricity);
    }
  }, [initState]);

  React.useEffect(() => {
    return () => {
      changeCold && changeCold('');
      changeHot && changeHot('');
      changeElectric && changeElectric('');
    };
  }, []);

  return (
    <React.Fragment>
      <Dialog
        open={open!}
        onClose={closeAdd}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (typeOfAction === 'add') {
              newPeriod!();
            } else if (typeOfAction === 'edit') {
              changePeriod!();
            }
            closeAdd!();
          },
          style: {
            backgroundColor: '#2f2954',
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Для отправки данных введите показания каждого из счетчиков
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="hot"
            label="Горячая вода"
            type="tel"
            fullWidth
            variant="outlined"
            onChange={(e) => changeHot && changeHot(e.target.value)}
            value={hot}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="cold"
            label="Холодная вода"
            type="tel"
            fullWidth
            variant="outlined"
            onChange={(e) => changeCold && changeCold(e.target.value)}
            value={cold}
          />

          <TextField
            className="input"
            autoFocus
            required
            margin="dense"
            id="electricity"
            label="Электричество"
            type="tel"
            fullWidth
            variant="outlined"
            onChange={(e) => changeElectric && changeElectric(e.target.value)}
            value={electricity}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAdd}>Отмена</Button>
          <Button type="submit">Отправить показания</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
