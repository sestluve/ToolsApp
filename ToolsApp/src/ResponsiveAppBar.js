import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from "./logo.jpg"
import { Drawer, Grid, List, ListItem, ListItemText, Paper, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createContext, useContext } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FadeMenu from './FadeMenu';
import NavOption from './NavOption';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRef } from 'react';
import zIndex from '@mui/material/styles/zIndex';
import TranslateIcon from '@mui/icons-material/Translate';
import { navStyles } from './NavOption';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar(props) {
  const classes = navStyles();

  const { dateStart, setDateStart, dateEnd, setDateEnd, refreshData, setRefreshData } = props;

  return (
    <React.Fragment>
      <AppBar sx={{ background: "white", padding: 0, margin: 0, color: "white", height: 80, overflow: "visible" }}>
        <Toolbar disableGutters sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', padding: 0, margin: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', padding: 0, margin: 0, background: "rgba(0, 60, 122, 1)", flexGrow: 1 }}>
          <Button onClick={() => {window.location.href = "/"}} variant="contained" color="primary" style={{ padding: 0, margin: 0 }}>
            <img src={logo} style={{ height: 80 }} />
            </Button>
            <Typography variant="h5" sx={{ marginLeft: '10px', padding: 5, margin: 0 }}>
              Tools
            </Typography>
            
          </Box>


          




          <Box display="flex" alignItems="center" justifyContent="center" sx={{ background: "rgba(179, 29, 35, 1)" }} style={{ minWidth: 300 }}>
            {props.userId == null ? (
              <Typography variant="h6">
                Niezalogowany
              </Typography>
            ) : (
              <Grid container style={{ height: "100%" }}>
                <Grid item xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography style={{ flex: 1, textAlign: 'center', color: "white" }} variant='h6'>{props.name} {props.surname} ({props.userId})</Typography>
                </Grid>
                <Grid item xs={12} onClick={() => {window.location.href = "/"}}>
              <List sx={{ alignItems: 'center', justifyContent: 'flex-end', color: "black", width: "100%", height: "100%" }} disablePadding>
              <ListItem button className={classes.listItem} style={{ padding: 0, margin: 0 }} >
        <ListItemText primary={(

<Typography style={{ flex: 1, textAlign: 'center', color: "white" }} variant='body1'>Wyloguj się</Typography>

        )} />
        </ListItem>
                </List>
                </Grid>
                </Grid>
            )}
          </Box>
        </Toolbar>
          
      </AppBar>
      
      
    </React.Fragment>
  );
}

export default ResponsiveAppBar;
