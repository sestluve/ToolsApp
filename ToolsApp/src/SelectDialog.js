import * as React from 'react';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useRef} from "react";
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
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function SelectDialog(props) {
    

  return (
    <div>
      
      <Dialog
        open={props.open}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            height: '90vh', // Set a height for the Dialog, e.g., 90% of the viewport height
          },
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              Test
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ overflowY: 'auto', flexGrow: 1, p: 2 }}>
          Test
        </Box>
        <DialogActions>
          <Button size="large" color="primary">
          Zatwierdź
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}