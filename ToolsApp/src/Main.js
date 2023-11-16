import logo from './logo.svg';
import './App.css';
import { Typography, Paper, Box, TextField, Button, Grid, Switch, ToggleButton, ToggleButtonGroup, FormControl, FilledInput, FormHelperText, OutlinedInput, AppBar, List, ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText, Chip, Divider, Toolbar, IconButton } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import scanCard from './scan_card.png'
import { useRef } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import ScanCard from './ScanCard';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import SelectDialog from './SelectDialog';
import NoSpacingGrid from './NoSpacingGrid';
import SquareButton from './SquareButton';
import ReplyDialog from './ReplyDialog';
import { useParams } from 'react-router-dom';
import { MyContext, theme } from './App';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import BuildIcon from '@mui/icons-material/Build';
import { useTheme } from "@mui/material/styles";
import CheckList from './CheckList';
import { Stack } from '@mui/system';


export default function Main(props) {
  
  const [userIdInputField, setUserIdInputField] = useState();
  const { card } = useParams();

  const {notify,  toolsState, setToolsState, selectedMachines, setSelectedMachines, toolsData, setToolsData} = useContext(MyContext)
  const [actualTime, setActualTime] = useState(null);
  const [actualShift, setActualShift] = useState(null);
  const checkboxesContainerRef = useRef(null)
  const [searchValue, setSearchValue] = useState("");

  
 




  const getUnixTime = () => {
    return Math.floor(Date.now() / 1000);
  };

  const theme = useTheme()

  const shifts = [
    [5*3600 + 45*60, 13*3600 + 45*60],
    [13*3600 + 45*60 + 1, 21*3600 + 45*60],
    [21*3600 + 45*60 + 1, 5*3600 + 45*60 - 1]
  ]





/*
  function saveChanges(postpone) {
    var endTime = 0;
      var on = -1;
        if(orderPlace != "P1") {
          on = orderNumber
        }

        if(isApplied) {
          endTime = getUnixTime();
          var body = JSON.stringify({
            "token": props.userId,
            "endTime": endTime,
            "name": props.name,
            "surname": props.surname,
            "postpone": postpone,
            "fixId": fixId
          });
        } else {
          var body = JSON.stringify({
            "token": props.userId,
            "leak": JSON.stringify(leaks),
            "startTime": getUnixTime(),
            "responsiblePerson": responsiblePerson,
            "selectionTime": loginTime,
            "orderNumber": on,
            "workplace": workplace,
            "name": props.name,
            "surname": props.surname,
            "postpone": postpone,
            "fixId": fixId

          });
        }
        

        fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      })
      .then(response => response.json())
      .then(data => {
        if(data['result'] == "success") {
          if(postpone) {
            setIsComplete(true);
          } else if(!isApplied) {
            setIsApplied(true);
            setLoginTime(Math.floor(Date.now() / 1000))
            console.log("Successfully saved data: " + data);
            setFixId(data['fixId']);
          } else {
            setIsComplete(true);
          }
        } else {
          console.log("Error saving data: " + data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
*/

/*

useEffect(() => {
  if(props.userId != null) {
    fetchData();
  }
}, [props.userId])


function fetchData() {
  fetch('/api/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    if(data['result'] == "success") {
      console.log("Successfully saved data: " + data);
    } else {
      console.log("Error saving data: " + data);
    }
  })
  .catch(error => {
    console.error(error);
  });
}
*/
  


  function formatUnixTime(unixTime) {
    // Compute hours, minutes, and seconds from the elapsed Unix time
    const hours = Math.floor(unixTime / 3600);
    const minutes = Math.floor((unixTime % 3600) / 60);
    const seconds = unixTime % 60;
  
    // Convert hours, minutes, and seconds to strings and pad them with zeros if needed
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
  
    // Combine hours, minutes, and seconds into the desired format
    let formattedTime = `${minutesStr}:${secondsStr}`;
  
    // Conditionally display hours only when they are non-zero
    if (hours !== 0) {
      formattedTime = `${hoursStr}:${formattedTime}`;
    }
  
    return formattedTime;
  }
  

  /*
  const handleQuantityChange = (id, newQuantity) => {
    setLeaks((prevState) => {
      const updatedLeak = { ...prevState.find(leak => leak.id === id), quantity: newQuantity };
      const updatedLeaks = prevState.map(leak => leak.id === id ? updatedLeak : leak);
      return updatedLeaks;
    });
  };
  */


  useEffect(() => {
   const interval = setInterval(() => {
     setActualTime(new Date().toLocaleString());
    

     const now = new Date();
        const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

        console.log("Current Time in Seconds:", secondsSinceMidnight);
        console.log("Shifts:", shifts);

        const currentShiftIndex = shifts.findIndex(([start, end]) => {
            if (start > end) { // Shift crosses midnight
                return secondsSinceMidnight >= start || secondsSinceMidnight <= end;
            }
            return secondsSinceMidnight >= start && secondsSinceMidnight <= end;
        });

        console.log("Current Shift Index:", currentShiftIndex);

        setActualShift(currentShiftIndex >= 0 ? currentShiftIndex : null);


   }, 1000)

   return () => {
     clearInterval(interval);
   }
  
  }, [shifts])


  function saveData() {
    const toolsWithoutB = selectedMachines.forEach(element => {
      
    }); toolsData.filter(([key, value]) => value !== 'b');
  }


  return (
      <Box display="flex" flexDirection="column" justifyContent='center' alignItems='center'>
    { props.userId != null ? (
      <Grid container spacing={3} 
      sx={{ 
        width: '100%', 
        p: 0,
      }}
      >
        <Grid item xs={12} lg={3}>
          <Stack spacing={3}>
          <Paper elevation={3} sx={{ textAlign: 'center', px: '50px', py: '50px' }}>
            <Typography variant='h5'>Aktualna zmiana:</Typography>
            <Typography variant='h6'>{ actualTime || "Brak informacji o czasie" }</Typography>
            <Typography variant='h6'>{ actualShift !== null && actualShift !== undefined ? [(actualShift + 1)].map(() => { return "I" } ) + " zmiana" : "Brak danych" }</Typography>
            <Button variant='contained' sx={{ mt: 5 }} onClick={() => saveData()}>Zapisz wyniki dla aktualnej zmiany</Button>
            </Paper>
          <Paper elevation={3} sx={{ textAlign: 'center', px: '50px', py: '50px' }}>
            <Typography variant='h5'>Wybrane maszyny:</Typography>
            <Typography variant='h6'>{(selectedMachines?.length > 0 && selectedMachines?.toLocaleString()) || "Nie wybrano"}</Typography>
            
            <TextField variant="standard" fullWidth sx={{ mt: 3, mb: 3 }} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

            <List sx={{ width: '100%', bgcolor: 'background.paper', height: 300, overflowY: "scroll" }}>
      {Object.keys(toolsData).filter((machine) => searchValue === "" || (selectedMachines.includes(machine) || machine.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))).sort((a, b) => {
    const indexA = selectedMachines?.indexOf(a);
    const indexB = selectedMachines?.indexOf(b);

    if (indexA > -1 && indexB > -1) {
        // Both a and b are in selectedMachines, sort by their order in selectedMachines
        return indexA - indexB;
    } else if (indexA > -1) {
        // Only a is in selectedMachines, a should come first
        return -1;
    } else if (indexB > -1) {
        // Only b is in selectedMachines, b should come first
        return 1;
    } else {
        // Neither a nor b is in selectedMachines, keep their original order or sort by another criteria
        return 0;
    }}).map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={() => {
              const currentIndex = selectedMachines?.indexOf(value);
              const newChecked = [...selectedMachines];
          
              if (currentIndex === -1) {
                newChecked.push(value);
                // Create a new object for the modified tool data
                const updatedToolData = Object.keys(toolsData[value]).reduce((acc, key) => {
                  acc[key] = "b";
                  return acc;
                }, {});
              
                // Update toolsData state immutably
                setToolsData({
                  ...toolsData,
                  [value]: updatedToolData
                });
              } else {
                newChecked.splice(currentIndex, 1);
                // Create a new object for the modified tool data
                const updatedToolData = Object.keys(toolsData[value]).reduce((acc, key) => {
                  acc[key] = "b";
                  return acc;
                }, {});
              
                // Update toolsData state immutably
                setToolsData({
                  ...toolsData,
                  [value]: updatedToolData
                });
              }
          
              setSelectedMachines(newChecked);
            }} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedMachines.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>







          </Paper>
          </Stack>
          </Grid>
        
        <Grid xs={12} lg={9}>
        <Stack spacing={3} direction={'row'} sx={{ ml: 5, mr: 5 }} ref={checkboxesContainerRef}>
        { Object.keys(selectedMachines)?.map((machineName) => {
          return (

            
              <Paper elevation={3} >

                <AppBar position="static" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} sx={{ p: 2, pl: 5, pr: 5 }}>
                  <BuildIcon />
                  <Typography variant='h6'>
                    {selectedMachines[machineName]}
                  </Typography>
                    <ToggleButton onClick={() => {
                      setToolsData({
                        ...toolsData,
                        [selectedMachines[machineName]]: Object.keys(toolsData[selectedMachines[machineName]]).reduce((acc, key) => {
                          acc[key] = "y";
                          return acc;
                        }, {})
                      });
                    }} value="by" title='Są wszystkie narzędzia' sx={{ theme: theme.palette.success.main }}>
                      
                      <CheckIcon color='success' />
                    </ToggleButton>

                </AppBar>
                
                <CheckList machineName={machineName} selectedMachines={selectedMachines} containerRef={checkboxesContainerRef} />





              </Paper>
            

          );
        })}
        </Stack>
        </Grid>
        </Grid>
            
      ) : (
        <Paper elevation={3} sx={{ textAlign: 'center', px: '50px', py: '50px' }}>
        <Grid container direction={'column'} spacing={2}>
          <ScanCard card={card} setToken={props.setToken} setUserId={props.setUserId} name={props.name} surname={props.surname} setName={props.setName} setSurname={props.setSurname} showLoadingScreen={props.showLoadingScreen} hideLoadingScreen={props.hideLoadingScreen} loading={props.loading} notify={(action, text) => { props.notify(action, text) }} />
        </Grid>
        </Paper>
      )}
    </Box>
  );
  
}