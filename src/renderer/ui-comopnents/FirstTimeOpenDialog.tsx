import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Checkbox, FormControlLabel } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

const FirstTimeOpenDialog = () => {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Расчета масляного насоса</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Программа для расчета масляного насоса
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
          Разработчик - студент кафедры Э2 Щепилов Е.А
        </DialogContentText>
        <DialogContentText>Научный руководитель Чирский С.П.</DialogContentText>
        <FormControlLabel
          control={<Checkbox size="small" />}
          label="Больше не показывать это сообщение"
        />
      </DialogContent>
      <DialogActions sx={{ p: '15px' }}>
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          target="_blank"
          href="https://github.com/shatrovEgor/KVD2.0"
          sx={{
            backgroundColor: '#238636',
            mr: '10px',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#235836',
              color: '#fff',
            },
          }}
        >
          GitHub
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FirstTimeOpenDialog;
