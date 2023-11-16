import * as React from 'react';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ReplyDialog(props) {
  return (
    <Dialog
      open={props.open}
      //onClose={() => { props.handleClose(null) }}
      fullWidth
      PaperProps={{
        sx: {
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          maxHeight: '300', // Set a smaller height for the Dialog, e.g., 50% of the viewport height
        },
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              props.handleClose(null);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="div">
          Test
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ overflowY: 'auto', flexGrow: 1, p: 2 }}>
        <DialogContent>
          Test
        </DialogContent>
      </Box>
      <DialogActions>
        <Button size="large" color="primary" >
          Zatwierdź
        </Button>
      </DialogActions>
    </Dialog>
  );
}
