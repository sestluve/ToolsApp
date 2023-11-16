import React from 'react';
import { Grid } from '@mui/material';

const NoSpacingGrid = ({ children, ...props }) => (
  <Grid container {...props} sx={(theme) => ({ margin: -theme.spacing(props.spacing), width: `calc(100% + ${theme.spacing(props.spacing * 2)}px)` })}>
    {children}
  </Grid>
);

export default NoSpacingGrid;