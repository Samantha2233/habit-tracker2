import React from 'react';
import { Box, Heading, Image } from '@chakra-ui/react';

import { Link } from './Link';

export function Logo() {
  return (
    <Heading as={Link} href="/habits" size="md" pt={1} display="flex" alignItems="center">
      <Box w="20px" mr="10px">
        <Image src="../hourglass2.png" />
      </Box>
      Habit Tracker
    </Heading>
  );
}
