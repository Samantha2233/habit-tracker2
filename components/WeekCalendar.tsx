import React, { useState } from 'react';
import moment from 'moment';
import { Button, VStack, Flex, Text } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { useDateStore } from '@/store';

export const WeekCalendar = () => {
  const dateSelected = useDateStore((state) => state.dateSelected);
  const setDateSelected = useDateStore((state) => state.setDateSelected);

  // Build Calendar
  const [startDay, setStartDay] = useState(moment().startOf('week'));
  let weekCalendar: any = [];

  for (let idx = 0; idx < 7; idx++) {
    const newDay = startDay.clone().add(idx, 'day');
    weekCalendar = [...weekCalendar, newDay];
  }

  return (
    <Flex justifyContent="space-between" bg="orange.50" alignItems="center">
      <Button
        bg="transparent"
        p={0}
        _hover={{ color: 'orange' }}
        onClick={() => {
          setStartDay(moment(startDay).subtract(7, 'days'));
          setDateSelected(moment(startDay).subtract(7, 'days').format('MMDDYYYY'));
        }}
      >
        <MdChevronLeft fontSize="22px" />
      </Button>
      {weekCalendar.map((day: any, idx: any) => {
        const isSelected = day.format('MMDDYYYY') === dateSelected;

        return (
          // Date
          <Button
            key={idx}
            onClick={() => {
              setDateSelected(moment(day).format('MMDDYYYY'));
            }}
            bg={isSelected ? 'orange.100' : 'none'}
            borderRadius={100}
            border={isSelected ? '1px solid orange' : 0}
            color="black"
            m={2}
            pt={10}
            pb={10}
          >
            <VStack>
              {/* "SU", "MO", "TU" ...*/}
              <Text fontWeight={isSelected ? '800' : '500'}>{day.format('dd').toUpperCase()}</Text>
              {/* "1", "2", "3" ...*/}
              <Text fontWeight={isSelected ? '800' : '500'}>{day.format('D')}</Text>
            </VStack>
          </Button>
        );
      })}
      <Button
        bg="transparent"
        p={0}
        _hover={{ color: 'orange' }}
        _focus={{ bg: 'transparent' }}
        onClick={() => {
          setStartDay(moment(startDay).add(7, 'days'));
          setDateSelected(moment(startDay).add(7, 'days').format('MMDDYYYY'));
        }}
      >
        <MdChevronRight fontSize="22px" />
      </Button>
    </Flex>
  );
};
