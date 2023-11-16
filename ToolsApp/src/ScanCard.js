import logo from './logo.svg';
import './App.css';
import { Typography, Paper, Box, TextField, Button, Grid, Switch, ToggleButton, ToggleButtonGroup, FormControl, FilledInput, FormHelperText, OutlinedInput } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import scanCard from './scan_card.png'
import { useRef } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar';
import { useNavigate } from "react-router-dom";
import { MyContext } from './App';

function initializeToolsData(data) {
  var tempToolsData = data;
  Object.keys(tempToolsData).forEach(machineName => {
      tempToolsData[machineName] = tempToolsData[machineName].reduce((acc, tool) => {
          acc[tool] = "b";
          return acc;
      }, {});
  });
  console.log("toolsData: " + JSON.stringify(tempToolsData));
  return(tempToolsData);
  }

export default function ScanCard(props) {
    const idTextField = useRef(null);
    const [previousTime, setPreviousTime] = useState(new Date().getTime());
    const formRef = useRef(null);

    const {toolsState, setToolsState, selectedMachines, setSelectedMachines, toolsData, setToolsData} = useContext(MyContext)
    

    const navigate = useNavigate();

    useEffect(() => {
        if(props.userId == null) {
          handleBlur();
        }
        const interval = setInterval(() => {
            if(props.userId == null) {
            if(idTextField.current != null) {
              const currentTime = new Date().getTime();
              const timeDifference = (currentTime - previousTime) / 1000; // Convert to seconds
    
              if (timeDifference >= 0.5) {
                console.log("The time difference is less than 1 second");
                if(idTextField != null && idTextField.current.value != "") {
                  handleSubmit();
                }
                idTextField.current.value = "";
              }
          }
        }
        }, 500); // Run every second
    
        if(props.card != null) {
          handleSubmit();
        }
        
        //return () => clearInterval(interval);
      }, []);


      const handleBlur = () => {
        idTextField.current.focus();
      };
    
    
      function handleUserIdChange(event) {
        setPreviousTime(new Date().getTime());
        //setUserIdInputField(event.target.value);
        
      }

      function handleSubmit(event) {
            if(event != null) {
                event.preventDefault();
              }
          
              if(idTextField.current != null) {
                props.showLoadingScreen();
                var tokenValue = idTextField.current.value;
                if(props.card != null) {
                  tokenValue = props.card;
                }
                  
                const tokenInt = parseInt(tokenValue, 10);
                const tokenModulo = tokenInt % 10000000;
                const tokenString = tokenModulo.toString();

              fetch('/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "token": tokenString,
                })
              })
              .then(response => response.json())
              .then(data => {
                console.log(data);
                if(data['result'] == "success") {
                  /*
                        props.setAlignment(data['orderType']);
                        props.setWeight(data['weight']);
                        props.setUserId(data['id'])
                        props.setName(data['name'])
                        props.setSurname(data['surname'])
                        props.setKgcost(data['kgcost'])
                        props.calculateCost(data['kgcost'], data['weight'])
                        */
                       console.log("Received data: " + JSON.stringify(data["data"]));



                       
                       setToolsData(initializeToolsData(data["data"]));
                       




                        props.setToken(tokenString);

                        props.setUserId(data['id'])
                        props.setName(data['name'])
                        props.setSurname(data['surname'])
                        props.notify("info", "Pomyślnie zalogowano!")
                        
                  
                } else {
                  props.notify("error", "Wystąpił błąd podczas logowania")
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


    return (
<div>
<form onSubmit={handleSubmit} ref={formRef}>
<Grid item xs={12}>
        <Typography variant="h4">Zeskanuj kartę, aby się zalogować</Typography>
        <Typography variant="body" color="secondary">
         Najpierw należy kliknąć w okno, tak by stało się aktywne
            </Typography>
          </Grid>
          <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={scanCard} alt="Zeskanuj kartę" style={{ width: '25rem' }} />
          </Box>
          </Grid>
          <Grid item xs={12}>
          <TextField id="outlined-basic" variant="standard" sx={{ mx: '20px' }} onChange={handleUserIdChange} inputRef={idTextField} onBlur={handleBlur} InputProps={{
        inputProps: {
            style: { textAlign: "center", width: 0, height: 0 },
        }
        
    }} 
    />
          </Grid>
          </form>
          </div>

)
}