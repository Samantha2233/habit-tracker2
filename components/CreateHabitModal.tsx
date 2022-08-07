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

import { useCreateHabitMutation, HabitInput } from '../types';

import { useAuth } from '@/context/auth';
import { HabitForm } from '@/components/HabitForm';

export const CREATE_HABIT_MUTATION = gql`
  mutation createHabit($data: HabitInput!) {
    createHabit(data: $data) {
      userId
      name
      description
      icon
      color
      recurrence
      totalComplete
    }
  }
`;

export interface CreateHabitModalProps {
  onClose: () => void;
  isOpen: boolean;
}

/** Description of component */
export function CreateHabitModal({ onClose, isOpen }: CreateHabitModalProps) {
  const { user } = useAuth();
  const [createHabit] = useCreateHabitMutation();
  const [recurrence, setRecurrence] = useState({});
  const [color, setColor] = useState('#ED8936');

  const onSubmit = async (data: HabitInput) => {
    const userId = user?.id;

    if (data && userId) {
      try {
        await createHabit({
          variables: {
            data: {
              userId: userId,
              name: data.name,
              description: data.description,
              icon: data.icon,
              color: color,
              recurrence: recurrence,
              timeOfDay: data.timeOfDay,
              totalComplete: data.totalComplete,
            },
          },
        });

        onClose();
      } catch (e) {
        throw new Error(`Error creating habit: ${e}`);
      }
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a New Habit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HabitForm
            onSubmit={onSubmit}
            setRecurrence={setRecurrence}
            color={color}
            setColor={setColor}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
