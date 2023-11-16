import React, { useEffect, useRef, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box } from '@mui/system';
import plFlag from "./Flags/pl.jpg";
import enFlag from "./Flags/en.jpg";
import ruFlag from "./Flags/ru.jpg";

export const navStyles = makeStyles((theme) => ({
  navList: {
    position: 'absolute',
    background: 'white',
    width: 300,
    zIndex: 1,
    top: 50,
    left: 0,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: '0px 0px 5px 0px rgb(0, 0, 0, 0.5)',
    color: "black",
    padding: 0,
    margin: 0
  },
  navListLeft: {
    position: 'absolute',
    background: 'white',
    width: 300,
    zIndex: 1,
    top: 115,
    right: 0,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 0px 5px 0px rgb(0, 0, 0, 0.5)',
    color: "black",
  },
  listItem: {
    display: 'flex',
    boxSizing: 'border-box',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    margin: 0,
    //background: "rgba(0, 60, 122, 1)",
    //color: "white",
  },
}));

const NavOption = (props) => {
  const [open, setOpen] = useState(false);
  const listRef = useRef();

  const switchOpen = (index) => {
    if (index != null) {
      if (props.variant === "day") {
        const newDate = new Date(props.date);
        newDate.setDate(index);
        props.setDate(newDate);
        console.log("Switched to: " + newDate);
      }
  
      if (props.variant === "month") {
        const newDate = new Date(props.date);
        newDate.setMonth(index);
        props.setDate(newDate);
        console.log("Switched to: " + newDate);
      }
  
      if (props.variant === "year") {
        const newDate = new Date(props.date);
        newDate.setFullYear(index);
        props.setDate(newDate);
        console.log("Switched to: " + newDate);
      }
    }
  
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setOpen(false);
        
      } else {
        
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [listRef]);

  const classes = navStyles();


  const getMaxHeight = () => {
    const viewportHeight = window.innerHeight;
    const buttonRect = listRef.current.getBoundingClientRect();
    const topOffset = buttonRect.top + buttonRect.height;
    const maxHeight = viewportHeight - topOffset - 10; // Adjust as needed
    return maxHeight;
  };




  // Define your navigation items as an array with unique IDs
  const navigationItems = [
    { id: 'orderId', label: 'Po numerze zamówienia' },
    { id: 'orderIndex', label: 'Po indeksie' },
    { id: 'leaksCount', label: 'Po ilości nieszczelności' },
    { id: 'loginTime', label: 'Po czasie logowania' },
    { id: 'startTime', label: 'Po czasie rozpoczęcia naprawy' },
    { id: 'endTime', label: 'Po czasie zakończenia naprawy' },
  ];

  const languages = [
    { id: 'pl', label: 'Polski', flag: plFlag },
    { id: 'en', label: 'English', flag: enFlag },
    { id: 'ru', label: 'Русский', flag: ruFlag },
  ];

  const monthLabels = Array.from(Array(12), (_, index) => {
    const date = new Date(2000, index, 1);
    return date.toLocaleString("pl", { month: 'long' });
  });

  const monthNavigationItems = monthLabels.map((label, index) => ({
    id: `month-${index + 1}`,
    label: label,
  }));

  const currentYear = new Date().getFullYear();

  const yearNavigationItems = Array.from(Array(currentYear - 2022), (_, index) => 2023 + index).map((year) => ({
    id: `year-${year}`,
    label: new Date(year, 0).toLocaleString("pl", { year: 'numeric' }),
  }));


  return (
    <React.Fragment>
      <ListItem button onClick={() => { switchOpen(null) }} className={classes.listItem} ref={listRef}>
        <ListItemText sx={props.variant == "translate" && ({margin: 3}) } primary={(

<Box display="flex" alignItems="center" justifyContent="center" width="100%">
<Typography style={{ flex: 1, textAlign: 'center' }}>{props.label}</Typography>
<ArrowDropDownIcon />
</Box>

        )} />
        
          
        {open && (
          <div className={props.variant == "translate" ? (classes.navListLeft) : (classes.navList) } style={{ maxHeight: getMaxHeight()}}>
              <List disablePadding style={{ width: '100%', overflowY: "auto" }}>
                { props.variant == "day" ? (
                    Array.from(Array(30), (_, index) => index + 1).map((number) => (
                      <ListItem button key={number} onClick={() => { switchOpen(number) }} style={{ width: '100%', }}>
                        <Typography style={{ flex: 1, textAlign: "center" }}>{number}</Typography>
                      </ListItem>
                    ))
                  ) : (
                    props.variant == "month" ? (
                      monthNavigationItems.map((item, index) => (
                        <ListItem button onClick={() => { switchOpen(index) }} key={item.id} style={{ width: '100%' }}>
                          <Typography style={{ flex: 1, textAlign: 'center' }}>{item.label}</Typography>
                        </ListItem>
                      ))
                      
                    ) : (
                      props.variant === 'year' ? (
                        yearNavigationItems.map((item) => (
                          <ListItem button onClick={() => { switchOpen(item.label) } } key={item.id} style={{ width: '100%' }}>
                            <Typography style={{ flex: 1, textAlign: 'center' }}>{item.label}</Typography>
                          </ListItem>
                        ))) : (
                navigationItems.map((item) => (
                  <ListItem button onClick={switchOpen} key={item.id} style={{ width: '100%', }}>
                    <Typography style={{ flex: 1, textAlign: 'center' }}>{item.label}</Typography>
                  </ListItem>
                ))
                )
                ))}
                
              </List>
          </div>
        )}
      </ListItem>
    </React.Fragment>
  );
};

export default NavOption;
