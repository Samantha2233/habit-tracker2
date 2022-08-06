import React from 'react';
import { Checkbox, Flex, HStack, Text } from '@chakra-ui/react';
import { GiFlamer } from 'react-icons/gi';

/** Renders error text under form inputs */
export function HabitCard(props: any) {
  const { name, color, streak, recurrence } = props.habit;

  const findRecurrenceDescription = (recurrence: any) => {
    if (recurrence.everyday) {
      return 'Everyday';
    } else if (recurrence.dayOfWeek?.length) {
      return `on ${recurrence.dayOfWeek[0]}s`;
    } else if (recurrence.timesPerWeek) {
      return `${recurrence.timesPerWeek} times per week`;
    } else if (recurrence.dayOfMonth?.length) {
      return `on ${recurrence.dayOfMonth[0]} of each month`;
    }
  };

  return (
    <Flex
      bg={`${color}.50`}
      borderRadius="8px"
      w="95%"
      mb={'3px !important'}
      p={2}
      alignItems="start"
      boxShadow={'sm'}
    >
      <Checkbox mr={2} mt={1} ml={1} colorScheme={color} size="md" borderColor={color} />
      <Flex direction="column" w="100%">
        <Text as="b" color={color}>
          {name}
        </Text>
        <Flex justifyContent="space-between">
          <Text fontSize="xs" color={color}>
            {findRecurrenceDescription(recurrence)}
          </Text>
          <HStack alignItems="center">
            <GiFlamer fontSize="15px" color={color} style={{ marginRight: -7, marginTop: -2 }} />
            <Text fontSize="xs" color={color}>
              {streak}
            </Text>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
}
