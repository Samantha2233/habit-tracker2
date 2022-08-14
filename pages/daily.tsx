import React from 'react';
import moment from 'moment';
import Head from 'next/head';
import { Center, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import { gql } from '@apollo/client';

import { useHabitsQuery } from '@/types';
import { useDateStore } from '@/store';
import { WeekCalendar } from '@/components/WeekCalendar';
import { ReorderList } from '@/components/ReorderList';
import { HabitCard } from '@/components/HabitCard';

function DailyPage() {
  const dateSelected = useDateStore((state) => state.dateSelected);

  // const GET_HABITS =
  gql`
    query habits {
      habits {
        id
        name
        description
        color
        icon
        recurrence
        timeOfDay
        date
        totalComplete
        createdAt
      }
    }
  `;

  const { data } = useHabitsQuery();
  return (
    <>
      <Head>
        <title>Daily View</title>
      </Head>

      <Center alignItems="flex-start">
        {/*  D A I L Y  */}
        <VStack
          border="1px solid var(--chakra-colors-orange-100)"
          borderRadius="8px"
          boxShadow="xl"
          minH="70vh"
        >
          <>
            <Heading p={3}>{findHeaderTitle(dateSelected)}</Heading>
            <WeekCalendar />
            <ReorderList habits={data?.habits} />
          </>
        </VStack>

        {/*  T H I S   W E E K  */}
        <VStack
          ml="20px"
          border="1px solid var(--chakra-colors-gray-100)"
          borderRadius="8px"
          boxShadow="xl"
          minH="70vh"
          minW="330px"
        >
          <Tabs w="100%" pt="25px" size="lg" colorScheme="black">
            <TabList>
              <Tab>This Week</Tab>
              <Tab>All Habits</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/* TODO: How much longer is in this week? */}
                {data?.habits?.map((habit: any) => {
                  if (habit.recurrence.timesPerWeek) {
                    return <HabitCard habit={habit} key={habit.id} />;
                  }
                })}
              </TabPanel>
              <TabPanel>
                {data?.habits?.map((habit: any) => {
                  return <HabitCard habit={habit} key={`habit-${habit.id}`} />;
                })}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Center>
    </>
  );
}

const findHeaderTitle = (dateSelected: string) => {
  if (dateSelected === moment().format('MMDDYYYY')) {
    return 'Today ';
  } else if (dateSelected === moment().add(1, 'days').format('MMDDYYYY')) {
    return 'Tomorrow';
  } else if (dateSelected === moment().add(-1, 'days').format('MMDDYYYY')) {
    return 'Yesterday';
  } else {
    return moment(dateSelected, 'MMDDYYYY').format('MMM D');
  }
};

export default DailyPage;
