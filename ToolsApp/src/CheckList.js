import React, { useContext, useEffect, useState, useRef } from 'react';
import { Box, List, ListItem, ListItemText, FormControl, ToggleButtonGroup, ToggleButton } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { CustomToggleButton, MyContext } from './App';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { useNavigate } from 'react-router-dom';

export default function CheckList(props) {
    const { machine, workplace, machineName, selectedMachines, containerRef } = props;
    const { selectedWorkplace, setSelectedWorkplace, toolsData, setToolsData } = useContext(MyContext);
    const [items, setItems] = useState(null)

    const [maxItemsPerColumn, setMaxItemsPerColumn] = useState(10);
    const navigate = useNavigate();


    useEffect(() => {
        function calculate() {
            if (containerRef.current) {
                const containerHeight = window.innerHeight - containerRef.current.getBoundingClientRect().top - 50;
                const itemHeight = 50; // Approximate height of a single list item, adjust as needed
                const itemsThatFit = Math.floor(containerHeight / itemHeight);
                if(itemsThatFit > 0) {
                    setMaxItemsPerColumn(itemsThatFit);
                }
                console.log("Calculated: " + itemsThatFit)
              }
        }

        const resize = window.addEventListener("resize", () => {
            calculate()
        })
            
            calculate();
              return () => {
                window.removeEventListener("resize", resize);
              }
    }, []);


    useEffect(() => {
      try {
      console.log("Selected Machines: ", selectedMachines);
      console.log("Workplace", workplace);
      const currentMachineData = toolsData[workplace][machineName];
      console.log("Current machine data: ", currentMachineData);
      console.log("Current machine data length: ", currentMachineData?.length);

        var tempItems = [];

            for(let i = 0; i < currentMachineData?.length; i += maxItemsPerColumn) {
                tempItems?.push(
                    <List sx={{ bgcolor: 'background.paper' }}>
            {currentMachineData?.slice(i, i + maxItemsPerColumn).map((toolObject, index) => {
              const name = toolObject.name;
              const labelId = `select-label-${selectedWorkplace}-${machineName}-${name}`;
              const id = index + i;

              return (
                <ListItem
                  key={name}
                  sx={{ p: 1, width: 450 }}
                  secondaryAction={<FormControl fullWidth>
                    <ToggleButtonGroup
                    disabled={currentMachineData && currentMachineData[id] && currentMachineData[id].dbState != "b"}
                      orientation="horizontal"
                      value={currentMachineData && currentMachineData[id] && currentMachineData[id].state}
                      exclusive
                      onChange={(e, newValue) => {
                        console.log("Changing to: ", newValue);
                      
                        if (!currentMachineData || !currentMachineData[id] || currentMachineData[id].dbState !== "b") {
                          return;
                        }
                      
                        if (newValue == null) return;
                      
                        setToolsData(prevToolsData => {

                      
                          // Create a shallow copy of prevToolsData
                          const updatedToolsData = { ...prevToolsData };
                      
                          // Update the state of the specific machine
                          updatedToolsData[workplace][machineName].find(tool => tool.name === name).state = newValue;
                      
                          return updatedToolsData;
                        });
                      }}
                    >
                        {toolObject.state == "b" && (
                          <CustomToggleButton value="b" title='Wybierz opcje' size='small'>
                        <QuestionMarkIcon color='warning' />
                      </CustomToggleButton>
                        )} 
                      
                      <ToggleButton value="x" title='Brak narzędzia' size='small'>
                        <ClearIcon color="warning" />
                      </ToggleButton>
                      
                      <ToggleButton value="y" title='Jest narzędzie' size='small'>
                        <CheckIcon color='success' />
                      </ToggleButton>
                      <ToggleButton value="w" title='Narzędzie na warsztacie, w ładowaniu' size='small'>
                        <HomeRepairServiceIcon color='primary' />
                      </ToggleButton>
                      <ToggleButton value="z" title='Narzędzie zniszczone' size='small'>
                        <BrokenImageIcon color='error' />
                      </ToggleButton>
                    </ToggleButtonGroup>



                  </FormControl>}
                >
                  <ListItemText id={labelId} primary={name}
                  primaryTypographyProps={{ style: { color: currentMachineData && currentMachineData[id] && currentMachineData[id].dbState != "b" ? 'grey' : 'inherit' } }}
                  />
                </ListItem>

              );
            })}
          </List>
                )
            }
        
        

        setItems(tempItems)
          } catch (error) {
            window.location.href = "/local-storage-error"
          }
    }, [toolsData, selectedMachines, machineName, maxItemsPerColumn])

return (
    <Box ref={containerRef} display="flex" flexDirection="row">
            
            {items}
                
                </Box>
)
                }