import React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = (size, fontSize) =>
  makeStyles({
    squareButton: {
      minWidth: `${size}px`,
      height: `${size}px`,
      padding: 0,
      fontSize: `${fontSize}px`,
      '&:before': {
        content: '""',
        paddingTop: '100%',
        float: 'left',
        visibility: 'hidden',
      },
      '&:after': {
        content: '""',
        display: 'table',
        clear: 'both',
      },
    },
  });

function SquareButton({ size = 40, fontSize = 14, ...props }) {
  const classes = useStyles(size, fontSize)();

  return (
    <Button className={classes.squareButton} variant="contained" color="primary" {...props} sx={{ margin: 0, padding: 0 }}>
      {props.children}
    </Button>
  );
}

export default SquareButton;
