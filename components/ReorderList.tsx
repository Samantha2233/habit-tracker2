import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';

import { HabitCard } from '@/components/HabitCard';
import { useDateStore } from '@/store';
import { getHabitPattern } from '@/utils/moment-recur';

export function ReorderList(props: any) {
  const dateSelected = useDateStore((state) => state.dateSelected);
  // How should I order by time of day and display time of day headers above?

  return (
    <Box w="90%">
      <VStack w="100%" pb="20px" pt="20px">
        <Text textAlign="center">Early Morning</Text>
        {props.habits?.map((habit: any) => {
          if (
            getHabitPattern(habit.recurrence, habit.createdAt)?.matches(
              moment(dateSelected, 'MMDDYYYY')
            )
          ) {
            return <HabitCard habit={habit} key={habit.id} />;
          } else {
            return null;
          }
        })}
        <Text textAlign="center">Late Morning</Text>
        <Text textAlign="center">Afternoon</Text>
        <Text textAlign="center">Evening</Text>
        <Text textAlign="center">Night</Text>
      </VStack>
    </Box>
  );
}
