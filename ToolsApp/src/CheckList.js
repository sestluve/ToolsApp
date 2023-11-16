import React, { useContext, useEffect, useState, useRef } from 'react';
import { Box, List, ListItem, ListItemText, FormControl, ToggleButtonGroup, ToggleButton } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { CustomToggleButton, MyContext } from './App';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

export default function CheckList(props) {
    const { machineName, selectedMachines, containerRef } = props;
    const { toolsData, setToolsData } = useContext(MyContext);
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
        const keys = Object.keys(toolsData[selectedMachines[machineName]])

        var tempItems = [];

            for(let i = 0; i < keys.length; i += maxItemsPerColumn) {
                tempItems?.push(
                    <List sx={{ bgcolor: 'background.paper' }}>
            {keys?.slice(i, i + maxItemsPerColumn).map((value) => {
              const labelId = `select-label-${machineName}-${value}`;

              return (
                <ListItem
                  key={value}
                  sx={{ p: 1, width: 450 }}
                  secondaryAction={<FormControl fullWidth>
                    <ToggleButtonGroup
                      orientation="horizontal"
                      value={toolsData && toolsData[selectedMachines[machineName]] && toolsData[selectedMachines[machineName]][value]}
                      exclusive
                      onChange={(e, newValue) => {
                        console.log("Changing to: ", newValue);
                        // Create a new state object by spreading the old state
                        if (newValue == null) return;
                        const updatedToolsData = {
                          ...toolsData,
                          [selectedMachines[machineName]]: {
                            ...toolsData[selectedMachines[machineName]],
                            [value]: newValue
                          }
                        };
                        // Set the new state
                        setToolsData(updatedToolsData);
                      } }
                    >
                        {toolsData[selectedMachines[machineName]][value] == "b" && (
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
                  <ListItemText id={labelId} primary={value} />
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