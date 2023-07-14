'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import React from 'react';
import HabitForm from './HabitForm';

type Props = {};

const HabitFormDialogCustom = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        {/* <Button> */}
        {/* <Plus /> */}
        Add Habit
        {/* </Button> */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <HabitForm />
      </DialogContent>
    </Dialog>
  );
};

export default HabitFormDialogCustom;
