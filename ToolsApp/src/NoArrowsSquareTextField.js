// NoArrowsSquareTextField.js
import React from 'react';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  noArrows: {
    '& input[type=number]': {
      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
      '-moz-appearance': 'textfield',
    },
  },
  square: (size) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
    },
    '& .MuiOutlinedInput-input': {
      width: `${size}px`,
      height: `${size}px`,
      padding: 0,
      textAlign: 'center',
      lineHeight: `${size}px`,
    },
  }),
});

const NoArrowsSquareTextField = ({ size = 40, ...props }) => {
  const classes = useStyles(size);
  return (
    <TextField
      {...props}
      type="number"
      className={`${classes.noArrows}`}
      InputProps={{
        classes: { root: classes.square },
      }}
    />
  );
};

export default NoArrowsSquareTextField;
