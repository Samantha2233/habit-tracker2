import React from 'react';
import Head from 'next/head';
import { Center, Heading } from '@chakra-ui/react';

function SettingsPage() {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Center></Center>

      <Center>
        <Heading size="lg">I am SETTINGS page</Heading>
      </Center>
    </>
  );
}

export default SettingsPage;
