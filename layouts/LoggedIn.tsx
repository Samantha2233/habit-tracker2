import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';

import { Logo } from '@/components/Logo';
import { GlobalLeftNav } from '@/components/GlobalLeftNav/GlobalLetNav';
import { CreateHabitModal } from '@/components/CreateHabitModal';
import { useAuth } from '@/context/auth';
import { Footer } from '@/components/Footer';

interface Props {
  children: React.ReactNode;
}

export function LoggedInLayout({ children }: Props) {
  const { logout } = useAuth();
  const router = useRouter();
  const createHabitModal = useDisclosure();

  async function handleLogout() {
    logout();

    await router.replace('/login');
  }

  return (
    // This is the whole viewport when logged in
    <Flex>
      <GlobalLeftNav />

      <Flex direction="column" minH="100vh" w="100%">
        <>
          <Flex p={4} justifyContent="space-between">
            <Logo />

            <Button as="a" ml={16} display="none" onClick={handleLogout}>
              Logout
            </Button>

            {/* <Box p="15px">
              <Button onClick={createHabitModal.onOpen} w="min">
                Create a Habit
              </Button>

            </Box> */}
            <Button
              variant="outline"
              borderRadius="100px"
              width="50px"
              height="50px"
              bg="orange.100"
              fontSize="25px"
              pb="4px"
              position="absolute"
              top="25px"
              right="25px"
              border="0"
              _hover={{ border: '1px solid orange' }}
              // _focus={{ boxShadow: 0, bg: 'orange.500' }}
              onClick={createHabitModal.onOpen}
            >
              +
            </Button>

            <CreateHabitModal
              onClose={() => {
                // refetch();
                createHabitModal.onClose();
              }}
              isOpen={createHabitModal.isOpen}
            />
          </Flex>
        </>

        <Box flex="1 1 auto" mt={8}>
          {children}
        </Box>

        <Footer />
      </Flex>
    </Flex>
  );
}
