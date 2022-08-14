import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';

import { HabitCard } from '@/components/HabitCard';
import { useDateStore } from '@/store';
import { getHabitPattern } from '@/utils/moment-recur';

export function ReorderList(props: any) {
  const dateSelected = useDateStore((state) => moment(state.dateSelected, 'MMDDYYYY'));
  const earlyMorningHabits: any = [];
  const lateMorningHabits: any = [];
  const afternoonHabits: any = [];
  const eveningHabits: any = [];
  const nightHabits: any = [];
  const anytimeHabits: any = [];

  // order and separate habits by timeOfDay
  props.habits?.forEach((habit: any) => {
    if (habit.timeOfDay === 'early_morning') {
      earlyMorningHabits.push(habit);
    } else if (habit.timeOfDay === 'late_morning') {
      lateMorningHabits.push(habit);
    } else if (habit.timeOfDay === 'afternoon') {
      afternoonHabits.push(habit);
    } else if (habit.timeOfDay === 'evening') {
      eveningHabits.push(habit);
    } else if (habit.timeOfDay === 'night') {
      nightHabits.push(habit);
    } else if (habit.timeOfDay === 'anytime') {
      anytimeHabits.push(habit);
    }
  });

  const renderHabit = (habit: any) => {
    if (
      getHabitPattern(habit.recurrence, habit.createdAt)?.matches(dateSelected) ||
      moment(habit.date).format('MMDDYYYY') === dateSelected.format('MMDDYYYY')
    ) {
      return <HabitCard habit={habit} key={habit.id} />;
    } else {
      return null;
    }
  };

  return (
    <Box w="90%">
      <VStack w="100%" pb="20px" pt="20px">
        {earlyMorningHabits.length ? (
          <Text
            textAlign="center"
            w="100%"
            color="orange.300"
            borderRadius="8px"
            p={1}
            fontWeight="700"
          >
            Early Morning
          </Text>
        ) : null}
        {earlyMorningHabits?.map((habit: any) => renderHabit(habit))}
        {lateMorningHabits.length ? (
          <Text
            textAlign="center"
            color="orange.400"
            w="100%"
            borderRadius="8px"
            p={1}
            fontWeight="700"
          >
            Late Morning
          </Text>
        ) : null}
        {lateMorningHabits?.map((habit: any) => renderHabit(habit))}
        {afternoonHabits.length ? (
          <Text
            textAlign="center"
            color="orange.500"
            w="100%"
            borderRadius="8px"
            p={1}
            fontWeight="700"
          >
            Afternoon
          </Text>
        ) : null}
        {afternoonHabits?.map((habit: any) => renderHabit(habit))}
        {eveningHabits.length ? (
          <Text
            textAlign="center"
            color="purple.400"
            w="100%"
            borderRadius="8px"
            p={1}
            fontWeight="700"
          >
            Evening
          </Text>
        ) : null}
        {eveningHabits?.map((habit: any) => renderHabit(habit))}
        {nightHabits.length ? (
          <Text
            textAlign="center"
            color="purple.600"
            w="100%"
            borderRadius="8px"
            p={1}
            fontWeight="700"
          >
            Night
          </Text>
        ) : null}
        {nightHabits?.map((habit: any) => renderHabit(habit))}

        {anytimeHabits.length > 0 ? (
          <Text
            textAlign="center"
            color="purple.900"
            w="100%"
            borderRadius="8px"
            p={1}
            fontWeight="700"
          >
            Anytime
          </Text>
        ) : null}
        {anytimeHabits?.map((habit: any) => renderHabit(habit))}
      </VStack>
    </Box>
  );
}
