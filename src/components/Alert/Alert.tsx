import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



type Props = {
  fetchDelete?: () => void;
  handleClose: () => void;
  open: boolean;
};

export default function AlertDialog({ handleClose, open, fetchDelete }: Props) {
  return (
  
      <React.Fragment>
        <Dialog
       
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Внимание!'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Вы действительно хотите удалить показания?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отменить удаление</Button>
            <Button
              onClick={() => {
                handleClose();
                fetchDelete!();
              }}
              autoFocus
            >
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
   
  );
}
