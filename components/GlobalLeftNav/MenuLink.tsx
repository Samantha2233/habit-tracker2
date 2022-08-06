import React, { useState } from 'react';
import { Text, Flex, MenuItem } from '@chakra-ui/react';

import { Link } from '@/components/Link';

interface Props {
  title: string;
  icon: any;
  route: string;
}

export const MenuLink = ({ title, icon, route }: Props) => {
  const [isHovered, setHovered] = useState(false);
  const selected = `/${route}` === window.location.pathname;

  return (
    <MenuItem backgroundColor="transparent !important">
      <Link
        href={`/${route}`}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Flex
          alignItems="center"
          p={2}
          bg={selected || isHovered ? 'orange.100' : 'transparent'}
          pl={10}
          pr={10}
          borderRadius={100}
          cursor="pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          minW="max-content"
        >
          {icon}
          <Text pl={2}>{title}</Text>
        </Flex>
      </Link>
    </MenuItem>
  );
};
