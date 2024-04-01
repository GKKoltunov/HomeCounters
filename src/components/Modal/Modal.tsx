import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { FormEvent } from 'react';

type Props = {
  changeHot?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  changeCold?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  changeElectric?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  action?: (event: FormEvent<HTMLFormElement>) => void;
  closeAdd?: () => void;
  open?: boolean;
  title: string;
};

export default function FormDialog({
  closeAdd,
  open,
  changeCold,
  changeElectric,
  changeHot,
  action,
  title,
}: Props) {
  return (
    <React.Fragment>
      <Dialog
        open={open!}
        onClose={closeAdd}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            action!(event);
            closeAdd!();
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
            type="text"
            fullWidth
            variant="standard"
            onChange={changeHot}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="cold"
            label="Холодная вода"
            type="text"
            fullWidth
            variant="standard"
            onChange={changeCold}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="electricity"
            label="Электричество"
            type="text"
            fullWidth
            variant="standard"
            onChange={changeElectric}
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
