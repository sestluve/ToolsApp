import React from "react";
import Main from "./Main";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Box, ThemeProvider } from "@mui/system";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Overlay from "./Overlay";
import { Button, Grid, Paper, Stack, ToggleButton, Typography } from "@mui/material";

import { createTheme } from '@mui/material/styles';
import styled from "@emotion/styled";


export const MyContext = React.createContext();


export const CustomToggleButton = styled(ToggleButton)(({ theme, color }) => ({
  backgroundColor: color.default,
  borderColor: color.border,
  '&:hover': {
    backgroundColor: color.hover,
  },
  '&.Mui-selected': {
    backgroundColor: color.selected,
    borderColor: color.selectedBorder,
    '&:hover': {
      backgroundColor: color.selectedHover,
    },
  },
}));


export default function App(props) {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);


  const [loading, setLoading] = useState(false);

  const [contactErrorInfo, setContactErrorInfo] = useState(false);


  const [dateLabel, setDateLabel] = React.useState("Nie można wczytać daty!");


  const passwordRef = useRef(null);
  const [signedIn, setSignedIn] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [password, setPassword] = React.useState("");


  const [token, setToken] = useState("");
  const [selectedMachines, setSelectedMachines] = useState((localStorage.getItem("selectedMachines") && JSON.parse(localStorage.getItem("selectedMachines"))) || []);
  const [toolsData, setToolsData] = useState([]);



  useEffect(() => {
    console.log("ToolsData: ", toolsData)
  }, [toolsData])
  
  
  



  const showLoadingScreen = () => {
    setLoading(true);
  };
  
  const hideLoadingScreen = () => {
    setLoading(false);
  };

  const notify = (action, text) => {
    if(action == "success") {
      toast.success(text, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else if(action == "info") {
      toast.info(text, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else if(action == "error") {
      if(text == "contact") {
        setContactErrorInfo(true)
      } else {
        toast.error(text, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
  }
    } else if(action == "warning") {
      toast.warn(text, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

useEffect(() => {
  localStorage.setItem("selectedMachines", JSON.stringify(selectedMachines))
}, [selectedMachines])




function handlePasswordChange() {
  setPassword(passwordRef.current.value)
}



  function handleUserIdChange(id) {
    setUserId(id);
  }


  const theme = createTheme({
    components: {
      MuiToggleButton: {
        styleOverrides: {
          root: {
            // Your custom styles here
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: 'rgb(244, 244, 244)',
            },
          },
        },
      },
    },
  });





return (
  <MyContext.Provider value={{notify, selectedMachines, setSelectedMachines, toolsData, setToolsData}}>
    <ThemeProvider theme={theme}>
  <Box>
  <Box component="main" sx={{ paddingTop: 15 }}>
    <LoadingOverlay loading={loading} />
      {contactErrorInfo && (
        <Overlay>
          <Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5, textAlign: 'center' }}>
            <Grid container>
              <Grid item xs={12}>
          <Typography variant="h4">                                                                                                                                                                                                                                                                                                                   
            Wystąpił błąd. Spróbuj wykonać ponownie ostatnią operację. Jeśli błąd będzie się powtarzał skontaktuj się z programistą działu IT.
          </Typography>
          </Grid>
          <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, textAlign: 'center' }}>
          <Button variant="contained" onClick={() => {setContactErrorInfo(false)}}>Zamknij</Button>
          </Box>
          </Grid>
          </Grid>
          </Box>
          
          </Paper>
        </Overlay>
        
      )}
      <ToastContainer />
      
      
  <Router>
              <Routes>
                  <Route exact path="/" element={
                  <div><Main setToken={setToken} userId={userId} setUserId={handleUserIdChange} name={name} setName={setName} surname={surname} setSurname={setSurname} showLoadingScreen={showLoadingScreen} hideLoadingScreen={hideLoadingScreen}  notify={(action, text) => { notify(action, text) }} /></div>
                  } ></Route>
                  
              </Routes>
          </Router>
          
          </Box>


          <ResponsiveAppBar token={token} userId={userId} name={name} surname={surname} />
       

          </Box>
          </ThemeProvider>
          </MyContext.Provider>

)
}