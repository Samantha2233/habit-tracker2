import React from 'react';
import Head from 'next/head';
import { Center, Heading } from '@chakra-ui/react';

function MonthlyPage() {
  return (
    <>
      <Head>
        <title>Monthly View</title>
      </Head>
      <Center></Center>

      <Center>
        <Heading size="lg">I am MONTHLY page</Heading>
      </Center>
    </>
  );
}

export default MonthlyPage;
