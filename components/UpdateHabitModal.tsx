import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { gql } from '@apollo/client';

import {
  // useUpdateHabitMutation,
  // HabitInput,
  UpdateHabitInput,
  // HabitWhereUniqueInput,
} from '../types';

import { HabitForm } from '@/components/HabitForm';

export const UPDATE_HABIT_MUTATION = gql`
  mutation updateHabit($data: UpdateHabitInput!) {
    updateHabit(data: $data) {
      id
    }
  }
`;

export interface UpdateHabitModalProps {
  onClose: () => void;
  isOpen: boolean;
  habit: any;
}

/** Description of component */
export function UpdateHabitModal({ onClose, isOpen, habit }: UpdateHabitModalProps) {
  // const [updateHabit] = useUpdateHabitMutation();
  const [recurrence, setRecurrence] = useState({});
  const [color, setColor] = useState('#ED8936');

  const onSubmit = async (data: UpdateHabitInput) => {
    console.log('recurrence', recurrence);

    if (data) {
      try {
        // await updateHabit({
        //   variables: {
        //     data: {
        //       name: data.name,
        //       description: data.description,
        //       icon: data.icon,
        //       color: color,
        //       recurrence: recurrence,
        //       timeOfDay: data.timeOfDay,
        //     },
        //   },
        // });

        onClose();
      } catch (e) {
        throw new Error(`Error updating habit: ${e}`);
      }
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Habit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HabitForm
            onSubmit={onSubmit}
            setRecurrence={setRecurrence}
            color={color}
            setColor={setColor}
            habit={habit}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
