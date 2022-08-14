import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  FormLabel,
  Select,
  Switch,
  Text,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { TwitterPicker } from 'react-color';
import moment from 'moment';

import { HabitInput } from '../types';

import { Kitty } from '@/components/Icons/Kitty';
import { RecurrenceForm } from '@/components/RecurrenceForm';

export interface HabitFormProps {
  onSubmit: (data: HabitInput) => Promise<void>;
  recurrence?: any;
  setRecurrence: any;
  color: string;
  setColor: (data: string) => void;
  habit?: any;
}

/** Description of component */
export function HabitForm({ onSubmit, setRecurrence, color, setColor, habit }: HabitFormProps) {
  const [icon] = useState('kitty');
  const [repeat, setRepeat] = useState(true);

  const { register, handleSubmit, getValues } = useForm<HabitInput>({
    defaultValues: {
      name: habit ? habit.name : '',
      description: habit ? habit.description : '',
      icon: habit ? habit.icon : '',
      timeOfDay: habit ? habit.timeOfDay : 'anytime',
      date: habit
        ? habit.date && moment(habit.date).format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD'),
      totalComplete: habit ? habit.totalComplete : 0,
    },
  });

  useEffect(() => {
    // If were rendering this form from UpdateHabitModal & already have a habit
    if (habit) {
      setColor(habit.color);

      if (habit.recurrence?.length > 0) {
        setRepeat(true);
      }
    }
  }, [habit, setColor]);

  const findColorName = (hex: string) => {
    let color = '';

    switch (hex.toUpperCase()) {
      case '#E53E3E':
        color = 'red';
        break;
      case '#ED8936':
        color = 'orange';
        break;
      case '#ECC94B':
        color = 'yellow';
        break;
      case '#48BB78':
        color = 'green';
        break;
      case '#38B2AC':
        color = 'teal';
        break;
      case '#4299E1':
        color = 'blue';
        break;
      case '#0BC5EA':
        color = 'cyan';
        break;
      case '#9F7AEA':
        color = 'purple';
        break;
      case '#ED64A6':
        color = 'pink';
        break;
      case '#718096':
        color = 'gray';
        break;
    }

    return color;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: '0 auto' }}>
      {/* Name / Description */}
      <FormLabel>Name</FormLabel>
      <Input
        placeholder="name"
        type="text"
        borderRadius="8px 8px 0 0"
        defaultValue={habit?.name}
        {...register('name', { required: true })}
      />
      <Textarea
        placeholder="description"
        borderRadius="0 0 8px 8px"
        borderTop="0"
        defaultValue={habit?.description}
        {...register('description')}
      />

      <Flex mt={5}>
        {/* Icon Popover */}
        <VStack>
          {/* <Input display="none" {...register('icon', { required: true })} /> */}
          <FormLabel>ICON</FormLabel>

          <Popover trigger="hover">
            <PopoverTrigger>
              <Box
                mt={'2px !important'}
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
        </VStack>

        <VStack ml={1}>
          {/* Color Popover*/}
          <FormLabel ml={3}>COLOR</FormLabel>
          <Input display="none" {...register('color', { required: true })} />
          <Popover trigger="hover">
            <PopoverTrigger>
              <Box
                mt={'2px !important'}
                ml={2}
                border="1px solid var(--chakra-colors-gray-200)"
                p={3.5}
                borderRadius="8px"
                display="flex"
                alignItems="center"
              >
                {/* Color Circle */}
                <Box w="20px" h="20px" bg={color} borderRadius="100px" cursor="pointer"></Box>
              </Box>
            </PopoverTrigger>
            <PopoverContent left="calc(50% - 22px)" top="10px" w="max-content">
              <TwitterPicker
                colors={[
                  '#E53E3E',
                  '#ED8936',
                  '#ECC94B',
                  '#48BB78',
                  '#38B2AC',
                  '#4299E1',
                  '#0BC5EA',
                  '#9F7AEA',
                  '#ED64A6',
                  '#718096',
                ]}
                color={color}
                onChangeComplete={(color: any) => {
                  setColor(color.hex);
                }}
              />
            </PopoverContent>
          </Popover>
        </VStack>
        <VStack w="100%" alignItems="flex-start" ml={1}>
          <FormLabel>Time of Day</FormLabel>
          <Select
            h="50px"
            mt={'2px !important'}
            {...register('timeOfDay', { required: true })}
            defaultValue={habit?.timeOfDay}
          >
            <option value="anytime">Anytime</option>
            <option value="early_morning">Early Morning</option>
            <option value="late_morning">Late Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </Select>
        </VStack>
      </Flex>

      <Flex pt={4} alignItems="center" ml={1} justifyContent={'flex-end'}>
        {!repeat ? (
          <Box w="100%" mr="20px">
            <FormLabel>Date</FormLabel>
            <Input defaultValue={habit?.date} type="date" {...register('date')} />
          </Box>
        ) : (
          <></>
        )}

        {/* Repeat */}
        <Flex pt={3} alignItems="center" ml={1}>
          <FormLabel>Repeat</FormLabel>
          <Switch
            colorScheme={findColorName(color)}
            isChecked={repeat}
            onChange={(e) => {
              setRepeat(e.target.checked);

              if (e.target.checked === false) {
                setRecurrence({});
              }
            }}
          />
        </Flex>
      </Flex>

      <Box
        borderWidth={repeat ? '1px' : 0}
        boxShadow={repeat ? 'md' : 0}
        borderColor="gray.200"
        borderRadius="8px"
        mt="20px"
      >
        {repeat ? (
          <>
            <Input display="none" {...register('recurrence', { required: true })} />
            <RecurrenceForm
              setRecurrence={setRecurrence}
              recurrence={habit?.recurrence}
              color={color}
            />
          </>
        ) : (
          <></>
        )}
      </Box>

      <Flex justifyContent={'flex-end'}>
        <Button type="submit" mt={5} mb={3} onClick={() => onSubmit(getValues())}>
          {habit ? 'Update Habit' : 'Add Habit'}
        </Button>
      </Flex>
    </form>
  );
}
