import React, { useState, useEffect } from 'react';
import { Box, Button, Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';

import { getColorName } from '@/utils/getColorName';
interface Props {
  setRecurrence: any;
  recurrence: any;
  color: string;
}

export function RecurrenceForm({ setRecurrence, recurrence, color = 'orange' }: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  const [daysOfWeek, setDaysOfWeek] = useState([
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]);

  const [daysOfMonth, setDaysOfMonth] = useState([1]);
  const [timesPerWeek, setTimesPerWeek] = useState(0);

  useEffect(() => {
    setRecurrence({ daysOfWeek: daysOfWeek });
  });

  useEffect(() => {
    if (recurrence) {
      if (recurrence.daysOfWeek) {
        setDaysOfWeek(recurrence.daysOfWeek);
        setTabIndex(0);
      } else if (recurrence.daysOfMonth) {
        setDaysOfMonth(recurrence.daysOfMonth);
        setTabIndex(2);
      } else if (recurrence.timesPerWeek) {
        setTimesPerWeek(recurrence.timesPerWeek);
        setTabIndex(1);
      }
    }
  }, [recurrence]);

  useEffect(() => {
    if (tabIndex === 0) {
      setRecurrence({ daysOfWeek: daysOfWeek });
    } else if (tabIndex === 1) {
      setRecurrence({
        timesPerWeek: timesPerWeek,
      });
    } else if (tabIndex === 2) {
      setRecurrence({ daysOfMonth: daysOfMonth });
    }
  }, [tabIndex, setRecurrence, daysOfWeek, timesPerWeek, daysOfMonth]);

  const adjustDaysOfWeek = (day: string) => {
    setDaysOfWeek((old) => {
      if (old.includes(day)) {
        return old.filter((d: string) => d !== day);
      } else {
        return [...old, day];
      }
    });
  };

  const adjustDaysOfMonth = (day: number) => {
    setDaysOfMonth((old) => {
      if (old.includes(day)) {
        return old.filter((d: number) => d !== day);
      } else {
        return [...old, day];
      }
    });
  };

  const adjustTimesPerWeek = (times: number) => {
    setTimesPerWeek(times);
    setRecurrence({
      timesPerWeek: timesPerWeek,
    });
  };

  return (
    <Box pt="20px">
      {/* Daily, Weekly or Monthly */}
      <Tabs
        index={tabIndex}
        variant="soft-rounded"
        colorScheme={getColorName(color)}
        onChange={(index) => setTabIndex(index)}
      >
        <TabList display="flex" justifyContent="space-around" w="100%">
          <Tab
            _hover={{
              backgroundColor: `${getColorName(color)}.100`,
            }}
          >
            Daily
          </Tab>
          <Tab
            _hover={{
              backgroundColor: `${getColorName(color)}.100`,
            }}
          >
            Weekly
          </Tab>
          <Tab
            _hover={{
              backgroundColor: `${getColorName(color)}.100`,
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
                  key={`${day.value}-of-the-week`}
                  colorScheme={`${getColorName(color)}`}
                  bg={daysOfWeek.includes(day.value) ? `${getColorName(color)}.500` : 'white'}
                  border={`1px solid ${getColorName(color)}`}
                  color={daysOfWeek.includes(day.value) ? 'white' : 'black'}
                  boxShadow={daysOfWeek.includes(day.value) ? 'xl' : 'sm'}
                  borderRadius="20px"
                  margin={1}
                  h="40px"
                  w="40px"
                  onClick={() => adjustDaysOfWeek(day.value)}
                  _hover={{
                    backgroundColor: daysOfWeek.includes(day.value)
                      ? `${getColorName(color)}.500`
                      : `${getColorName(color)}.100`,
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
                    key={`${day}s-per-week`}
                    colorScheme={`${getColorName(color)}`}
                    bg={timesPerWeek === day + 1 ? `${getColorName(color)}.500` : 'white'}
                    border={`1px solid ${getColorName(color)}`}
                    color={timesPerWeek === day + 1 ? 'white' : 'black'}
                    borderRadius="20px"
                    margin={1}
                    h="40px"
                    w="40px"
                    onClick={() => adjustTimesPerWeek(day + 1)}
                    _hover={{
                      backgroundColor:
                        timesPerWeek === day + 1
                          ? `${getColorName(color)}.500`
                          : `${getColorName(color)}.100`,
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
                    key={day}
                    colorScheme={`${getColorName(color)}`}
                    bg={daysOfMonth.includes(day + 1) ? `${getColorName(color)}.500` : 'white'}
                    border={`1px solid ${getColorName(color)}`}
                    color={daysOfMonth.includes(day + 1) ? 'white' : 'black'}
                    borderRadius="20px"
                    margin={1}
                    h="40px"
                    w="40px"
                    onClick={() => adjustDaysOfMonth(day + 1)}
                    _hover={{
                      backgroundColor: daysOfMonth.includes(day + 1)
                        ? `${getColorName(color)}.500`
                        : `${getColorName(color)}.100`,
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
