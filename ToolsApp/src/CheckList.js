import React, { useContext, useEffect, useState, useRef } from 'react';
import { Box, List, ListItem, ListItemText, FormControl, ToggleButtonGroup, ToggleButton } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { CustomToggleButton, MyContext } from './App';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

export default function CheckList(props) {
    const { workplace, machineName, selectedMachines, containerRef } = props;
    const { selectedWorkplace, setSelectedWorkplace, toolsData, setToolsData } = useContext(MyContext);
    const [items, setItems] = useState(null)

    const [maxItemsPerColumn, setMaxItemsPerColumn] = useState(10);


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
      const currentMachineData = toolsData[selectedWorkplace][selectedMachines[machineName]];

        var tempItems = [];

            for(let i = 0; i < currentMachineData.length; i += maxItemsPerColumn) {
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
                        // Create a new state object by spreading the old state

                        
                        if(currentMachineData[id].dbState != "b") {
                          return;
                        }
                        

                        if (newValue == null) return;

                        setToolsData(prevToolsData => {
                          // Create a deep copy of the previous state
                          const updatedToolsData = JSON.parse(JSON.stringify(prevToolsData));
                        
                          // Extract the workplace and machine name from selectedMachines
                          const { workplace, machine_name } = selectedMachines[machineName]; // Assuming selectedMachines[machineName] has the correct structure
                        
                          // Check if the specific machine exists in the data
                          if (updatedToolsData[workplace] && updatedToolsData[workplace][machine_name]) {
                            // Update the specific tool in the array
                            if (updatedToolsData[workplace][machine_name][id]) {
                              updatedToolsData[workplace][machine_name][id] = {
                                ...updatedToolsData[workplace][machine_name][id],
                                state: newValue
                              };
                            }
                          }
                        
                          // Return the updated state
                          return updatedToolsData;
                        });
                      } }
                    >
                        {toolsData[selectedMachines[machineName]][id].state == "b" && (
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
    }, [toolsData, selectedMachines, machineName, maxItemsPerColumn])

return (
    <Box ref={containerRef} display="flex" flexDirection="row">
            
            {items}
                
                </Box>
)
                }