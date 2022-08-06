import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Switch,
  Text,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { TwitterPicker } from 'react-color';

import { HabitInput } from '../types';

import { Kitty } from '@/components/Icons/Kitty';
import { RecurrenceForm } from '@/components/RecurrenceForm';

export interface HabitFormProps {
  onSubmit: (data: HabitInput) => Promise<void>;
  recurrence: any;
  setRecurrence: (data: any) => Promise<void>;
  color: string;
  setColor: (data: string) => void;
}

/** Description of component */
export function HabitForm({ onSubmit, setRecurrence, color, setColor }: HabitFormProps) {
  const [icon] = useState('kitty');
  const [repeat, setRepeat] = useState(false);
  // const [recurrence, setRecurrence] = useState({});

  const { register, handleSubmit, getValues } = useForm<HabitInput>({
    defaultValues: {
      name: '',
      description: '',
      icon: '',
      recurrence: {},
      timeOfDay: 'anytime',
      totalComplete: 0,
    },
  });

  console.log('getValues', getValues());

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: '0 auto' }}>
      {/* Name / Description */}
      <Input
        placeholder="name"
        type="text"
        borderRadius="8px 8px 0 0"
        {...register('name', { required: true })}
      />
      <Textarea
        placeholder="description"
        borderRadius="0 0 8px 8px"
        borderTop="0"
        {...register('description')}
      />

      <Flex>
        {/* Icon Popover */}
        <Input display="none" {...register('icon', { required: true })} />
        <Popover trigger="hover">
          <PopoverTrigger>
            <Box
              mt={5}
              w="60px"
              border="1px solid var(--chakra-colors-gray-200)"
              p={3}
              borderRadius="8px"
            >
              {/* TODO: Dynamically render icons based on what you've chosen */}
              {icon === 'kitty' && <Kitty color={color} />}
            </Box>
          </PopoverTrigger>
          <PopoverContent left="calc(50% - 22px)" top="10px" w="max-content">
            {/* TODO: Set up icons to be chosen here */}
            <Text> Icon Selector Here </Text>
          </PopoverContent>
        </Popover>

        {/* Color Popover*/}
        <Input display="none" {...register('color', { required: true })} />
        <Popover trigger="hover">
          <PopoverTrigger>
            <Box
              mt={5}
              ml={2}
              border="1px solid var(--chakra-colors-gray-200)"
              p={3}
              borderRadius="8px"
              display="flex"
              alignItems="center"
            >
              <Box w="20px" h="20px" bg={color} borderRadius="100px" cursor="pointer"></Box>
            </Box>
          </PopoverTrigger>
          <PopoverContent left="calc(50% - 22px)" top="10px" w="max-content">
            <TwitterPicker
              color={color}
              onChangeComplete={(color: any) => {
                console.log('Complete: changing color to', color.hex);
                setColor(color.hex);
              }}
              onChange={(color: any) => {
                console.log('changing color to', color.hex);
                setColor(color.hex);
              }}
            />
          </PopoverContent>
        </Popover>
      </Flex>

      <Select {...register('timeOfDay', { required: true })} pt={'10px'}>
        <option value="anytime">Anytime</option>
        <option value="early_morning">Early Morning</option>
        <option value="late_morning">Late Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
        <option value="night">Night</option>
      </Select>

      {/* Repeat */}
      <Flex pt={3} alignItems="center" ml={1}>
        <Text pr={2}>Repeat</Text>
        <Switch
          colorScheme={'orange'}
          isChecked={repeat}
          onChange={(e) => setRepeat(e.target.checked)}
        />
      </Flex>

      {repeat ? (
        <>
          <Input display="none" {...register('recurrence', { required: true })} />
          <RecurrenceForm setRecurrence={setRecurrence} />
        </>
      ) : null}

      <Flex justifyContent={'flex-end'}>
        <Button type="submit" mt={5} mb={3} onClick={() => onSubmit(getValues())}>
          Add Habit
        </Button>
      </Flex>
    </form>
  );
}
