import React, { useState } from 'react';
import { Box, Button, Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';

interface Props {
  setRecurrence: any;
}

export function RecurrenceForm({ setRecurrence }: Props) {
  const [daysOfWeek, setDaysOfWeek] = useState(['sunday']);
  const [daysOfMonth, setDaysOfMonth] = useState([1]);
  const [timesPerWeek, setTimesPerWeek] = useState(1);

  const adjustDaysOfWeek = (day: string) => {
    setDaysOfMonth([]);
    setTimesPerWeek(0);
    setDaysOfWeek((old) => {
      if (old.includes(day)) {
        return old.filter((d: string) => d !== day);
      } else {
        return [...old, day];
      }
    });

    setRecurrence({
      daysOfWeek: daysOfWeek,
    });
  };

  const adjustDaysOfMonth = (day: number) => {
    setDaysOfWeek([]);
    setTimesPerWeek(0);
    setDaysOfMonth((old) => {
      if (old.includes(day)) {
        return old.filter((d: number) => d !== day);
      } else {
        return [...old, day];
      }
    });

    setRecurrence({
      daysOfMonth: daysOfMonth,
    });
  };

  const adjustTimesPerWeek = (times: number) => {
    setDaysOfWeek([]);
    setDaysOfMonth([]);
    setTimesPerWeek(times);

    setRecurrence({
      timesPerWeek: timesPerWeek,
    });
  };

  return (
    <Box pt="20px">
      {/* Daily, Weekly or Monthly */}
      <Tabs variant="soft-rounded" colorScheme="orange">
        <TabList display="flex" justifyContent="space-around" W="100%">
          <Tab
            _hover={{
              backgroundColor: 'orange.100',
            }}
          >
            Daily
          </Tab>
          <Tab
            _hover={{
              backgroundColor: 'orange.100',
            }}
          >
            Weekly
          </Tab>
          <Tab
            _hover={{
              backgroundColor: 'orange.100',
            }}
          >
            Monthly
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel display="flex" justifyContent="space-around">
            {daysOfTheWeek.map((day) => {
              return (
                <Button
                  colorScheme="orange"
                  bg={daysOfWeek.includes(day.value) ? 'orange.500' : 'white'}
                  border={'1px solid orange'}
                  color={daysOfWeek.includes(day.value) ? 'white' : 'black'}
                  boxShadow={daysOfWeek.includes(day.value) ? 'xl' : 'sm'}
                  borderRadius="20px"
                  margin={1}
                  h="40px"
                  w="40px"
                  onClick={() => adjustDaysOfWeek(day.value)}
                  _hover={{
                    backgroundColor: daysOfWeek.includes(day.value) ? 'orange.500' : 'orange.100',
                  }}
                >
                  {day.title}
                </Button>
              );
            })}
          </TabPanel>
          <TabPanel>
            <Box w={'100%'} display="flex" justifyContent="center">
              <Box w="93%">
                {Array.from(Array(7).keys()).map((day) => (
                  <Button
                    colorScheme="orange"
                    bg={timesPerWeek === day + 1 ? 'orange.500' : 'white'}
                    border={'1px solid orange'}
                    color={timesPerWeek === day + 1 ? 'white' : 'black'}
                    borderRadius="20px"
                    margin={1}
                    h="40px"
                    w="40px"
                    onClick={() => adjustTimesPerWeek(day + 1)}
                    _hover={{
                      backgroundColor: timesPerWeek === day + 1 ? 'orange.500' : 'orange.100',
                    }}
                  >
                    {day + 1}
                  </Button>
                ))}
              </Box>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box w={'100%'} display="flex" justifyContent="center">
              <Box w="93%">
                {Array.from(Array(31).keys()).map((day) => (
                  <Button
                    colorScheme="orange"
                    bg={daysOfMonth.includes(day + 1) ? 'orange.500' : 'white'}
                    border={'1px solid orange'}
                    color={daysOfMonth.includes(day + 1) ? 'white' : 'black'}
                    borderRadius="20px"
                    margin={1}
                    h="40px"
                    w="40px"
                    onClick={() => adjustDaysOfMonth(day + 1)}
                    _hover={{
                      backgroundColor: daysOfMonth.includes(day + 1) ? 'orange.500' : 'orange.100',
                    }}
                  >
                    {day + 1}
                  </Button>
                ))}
              </Box>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

const daysOfTheWeek = [
  {
    title: 'S',
    value: 'sunday',
  },
  {
    title: 'M',
    value: 'monday',
  },
  {
    title: 'T',
    value: 'tuesday',
  },
  {
    title: 'W',
    value: 'wednesday',
  },
  {
    title: 'T',
    value: 'thursday',
  },
  {
    title: 'F',
    value: 'friday',
  },
  {
    title: 'S',
    value: 'saturday',
  },
];
