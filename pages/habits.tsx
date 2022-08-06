import React from 'react';
import Head from 'next/head';
import { Center, Heading } from '@chakra-ui/react';

function HabitsPage() {
  return (
    <>
      <Head>
        <title>All Habits</title>
      </Head>
      <Center></Center>

      <Center>
        <Heading size="lg">I am habits page</Heading>
      </Center>
    </>
  );
}

export default HabitsPage;
