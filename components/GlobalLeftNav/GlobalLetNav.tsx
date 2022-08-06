import React from 'react';
import { Box, Text, Flex, useColorMode, Switch, Menu, useDisclosure } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';
import { BsCalendar2Date } from 'react-icons/bs';
import { GrView } from 'react-icons/gr';

import { MenuLink } from '@/components/GlobalLeftNav/MenuLink';
import { HamburgerToX } from '@/components/Icons/HamburgerToX';

export const GlobalLeftNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      borderRight="orange"
      position="relative"
      width={!isOpen ? '65px' : 'auto'}
      bg="gray.50"
      transition="0.5s"
    >
      {/* Hamburger / X */}
      <Box position="absolute" right={5} top={25} cursor="pointer">
        <HamburgerToX color="#A0AEC0" isOpen={isOpen} setOpen={isOpen ? onClose : onOpen} />
      </Box>
      {/* Menu Options Box*/}
      <Flex
        width={isOpen ? 'auto' : 0}
        height="100vh"
        overflow="hidden"
        pt={20}
        pl={isOpen ? '25px' : '0px'}
        pr={isOpen ? '25px' : '0px'}
        style={{ transition: '0.5s' }}
        transition="0.5s"
        direction="column"
        justifyContent="space-between"
      >
        {/* Menu Items */}
        <Box>
          <Menu>
            {/* Daily View */}
            <MenuLink title="Daily View" icon={<GrView fontSize="20px" />} route="daily" />

            {/* Monthly View */}
            <MenuLink
              title="Monthly View"
              icon={<BsCalendar2Date fontSize="20px" />}
              route="monthly"
            />

            {/* Settings */}
            <MenuLink title="Settings" icon={<FiSettings fontSize="20px" />} route="settings" />
          </Menu>
        </Box>

        {/* Light / Dark Mode */}
        <Flex alignItems="center" pl={10} pb={50}>
          <Switch size="md" value={colorMode} onChange={() => toggleColorMode()} />
          <Text pl={2}>Light Mode</Text>
        </Flex>
      </Flex>
    </Box>
  );
};
