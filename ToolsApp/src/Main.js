import logo from './logo.svg';
import './App.css';
import { Typography, Paper, Box, TextField, Button, Grid, Switch, ToggleButton, ToggleButtonGroup, FormControl, FilledInput, FormHelperText, OutlinedInput, AppBar, List, ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText, Chip, Divider, Toolbar, IconButton, ListSubheader } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import scanCard from './scan_card.png'
import { useRef } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import ScanCard, { initializeToolsData, login } from './ScanCard';
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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function Main(props) {
  
  const [userIdInputField, setUserIdInputField] = useState();
  const { card } = useParams();

  const {showLoadingScreen, hideLoadingScreen, selectedWorkplace, setSelectedWorkplace, actualTime, setActualTime, setActualShift, token, setToken, userId, name, surname, notify,  toolsState, setToolsState, selectedMachines, setSelectedMachines, toolsData, setToolsData} = useContext(MyContext)
  
  const { actualShift } = props;

  
  const checkboxesContainerRef = useRef(null)
  const [searchValue, setSearchValue] = useState("");

  
 
  useEffect(() => {
    if(token != null && userId != null) {
      login(props, toolsData, setToolsData, token, actualShift, showLoadingScreen)
    }
    
  }, [actualShift])




  const getUnixTime = () => {
    return Math.floor(Date.now() / 1000);
  };

  const theme = useTheme()


  


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










  function saveData() {
    var toolsToSave = [];
    var allToolsSelected = true;

    // Iterate over each selected machine
    for (const { workplace, machine_name } of selectedMachines) {
        // Check if toolsData has the workplace and machine_name property
        if (toolsData[workplace] && toolsData[workplace][machine_name]) {
            for (const toolObject of toolsData[workplace][machine_name]) {
                // Check if any tool's state is 'b', if so, not all tools are selected
                if (toolObject.state === 'b') {
                    allToolsSelected = false;
                    break;
                }

                // Add tools to save only if db_state is 'b' and current state is not 'b'
                if (toolObject.dbState === 'b' && toolObject.state !== 'b') {
                    toolsToSave.push({ 
                        workplace: workplace, // assuming workplace is the correct key
                        machine_name: machine_name,
                        tool_name: toolObject.name,
                        tool_state: toolObject.state
                    });
                }
            }
        } else {
            // If the workplace or machine_name is not found in toolsData, not all tools are selected
            allToolsSelected = false;
            break;
        }

        // If at any point allToolsSelected is false, break the outer loop
        if (!allToolsSelected) {
            break;
        }
    }

    // Alert or proceed to save based on allToolsSelected flag
    if (!allToolsSelected) {
        alert("Musisz zaznaczyć wszystkie narzędzia!");
    } else {
        console.log("toolsToSave: ", toolsToSave);

        fetch('/api/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "userId": userId,
            "userName": name,
            "userSurname": surname,
            "data": toolsToSave,
            "actualShift": actualShift
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if(data['result'] === "success") {
            alert("Zapisano!")
            login(props, toolsData, setToolsData, token, actualShift)
          } else {
            props.notify("error", "Wystąpił błąd podczas zapisywania danych!")
          }
        })
        .catch(error => {
          console.error(error);
          props.notify("error", "contact")
        })
        .finally(() => {
          props.hideLoadingScreen();
        });
    }
}



  



function convertToRoman(num) {
  const romanMap = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
  };

  let roman = '';
  for (let key in romanMap) {
      while (num >= romanMap[key]) {
          roman += key;
          num -= romanMap[key];
      }
  }
  return roman;
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
            <Typography variant='h6'>{ actualShift !== null && actualShift !== undefined ? convertToRoman(actualShift + 1) + " zmiana" : "Brak danych" }</Typography>
            <Button variant='contained' sx={{ mt: 5 }} onClick={() => saveData()}>Zapisz wyniki dla aktualnej zmiany</Button>
            </Paper>
          <Paper elevation={3} sx={{ textAlign: 'center', px: '50px', py: '50px' }}>
            
            <TextField variant="standard" fullWidth sx={{ mt: 3, mb: 3 }} label="Wyszukaj maszynę w stanowisku" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

            <List sx={{ width: '100%', bgcolor: 'background.paper', height: 300, overflowY: "scroll" }}>
      {selectedWorkplace == null ? Object.keys(toolsData).map((machineName) => (
        <React.Fragment>
        <ListItem
          key={"machine-" + machineName}
          disablePadding
        >
          <ListItemButton role={undefined} onClick={() => setSelectedWorkplace(machineName)}>
            {machineName}
            </ListItemButton>
        </ListItem>
        
        </React.Fragment>
      ))
        :  
        <>
        <ListItem
        key={"back-to-workplaces-button"}
        disablePadding
      >
          <ListItemButton role={undefined} onClick={() => setSelectedWorkplace(null)}>
            <ArrowBackIosNewIcon /> Powrót
          </ListItemButton>
          </ListItem>
           { Object.keys(toolsData[selectedWorkplace]).filter((machine) => searchValue === "" || (selectedMachines.find((selectedMachine) => selectedMachine.machine_name === machine || (machine.toLowerCase().includes(searchValue.toLowerCase()) )))).sort((a, b) => {
          const indexA = selectedMachines.findIndex((machine) => machine.machine_name === a);
          const indexB = selectedMachines.findIndex((machine) => machine.machine_name === b);
      

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
    }}).map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <React.Fragment>
          <ListItem
            key={value}
            disablePadding
          >
            <ListItemButton role={undefined} 
              onClick={() => {
                const machineToToggle = { workplace: selectedWorkplace, machine_name: value };
                const currentIndex = selectedMachines?.findIndex(
                  (machine) => machine?.workplace === machineToToggle?.workplace && machine?.machine_name === machineToToggle?.machine_name
                );
              
                let newChecked;
              
                if (currentIndex === -1) {
                  newChecked = [...selectedMachines, machineToToggle]; // Add the machine object if it's not already in the array
                } else {
                  newChecked = selectedMachines.filter((_, index) => index !== currentIndex); // Remove the machine object if it's already in the array
                }
              
                setSelectedMachines(newChecked);
              
                // Call the login function with updated parameters
                login(props, toolsData, setToolsData, token, actualShift);
              }}
            dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedMachines?.findIndex((machine) => machine?.workplace === selectedWorkplace && machine?.machine_name === value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItemButton>
          </ListItem>
          </React.Fragment>
          );
        })
      }
        </>
      }
    </List>







          </Paper>
          </Stack>
          </Grid>
        
        <Grid xs={12} lg={9}>
        <Stack spacing={3} direction={'row'} sx={{ ml: 5, mr: 5 }} ref={checkboxesContainerRef}>
        { selectedMachines?.map((machine, index) => {
          const machineName = machine.machine_name;
          const workplace = machine.workplace;
          return (

            
              <Paper elevation={3} >

                <AppBar position="static" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} sx={{ p: 2, pl: 5, pr: 5 }}>
                  <BuildIcon />
                  <Typography variant='h6' sx={{ pl: 5, pr: 5 }}>
                    {workplace} - <br /> {machineName}
                  </Typography>
                    <ToggleButton onClick={() => {
                      setToolsData(prevToolsData => {

                      
                        // Create a shallow copy of prevToolsData
                        const updatedToolsData = { ...prevToolsData };
                    
                        // Update the state of the specific machine
                        updatedToolsData[workplace][machineName]?.forEach(tool => {
                          tool.state = "y";
                        });
                        
                    
                        return updatedToolsData;
                      });
                    }} value="by" title='Są wszystkie narzędzia' sx={{ theme: theme.palette.success.main }}>
                      
                      <CheckIcon color='success' />
                    </ToggleButton>

                </AppBar>
                
                <CheckList machine={machine} workplace={workplace} machineName={machineName} selectedMachines={selectedMachines} containerRef={checkboxesContainerRef} />





              </Paper>
            

          );
        })}
        </Stack>
        </Grid>
        </Grid>
            
      ) : (
        <Paper elevation={3} sx={{ textAlign: 'center', px: '50px', py: '50px' }}>
        <Grid container direction={'column'} spacing={2}>
          <ScanCard actualShift={props.actualShift} card={card} setToken={props.setToken} setUserId={props.setUserId} name={props.name} surname={props.surname} setName={props.setName} setSurname={props.setSurname} showLoadingScreen={props.showLoadingScreen} hideLoadingScreen={props.hideLoadingScreen} loading={props.loading} notify={(action, text) => { props.notify(action, text) }} />
        </Grid>
        </Paper>
      )}
    </Box>
  );
  
}
