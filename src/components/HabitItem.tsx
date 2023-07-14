import { Habit } from '@prisma/client';
import { ArrowRight, Check, MoreVertical, Pen, X } from 'lucide-react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';
import { Button } from './ui/Button';
import StatusUpdateButton from './StatusUpdateButton';

type Props = {
  habit: Habit;
};

const HabitItem = ({ habit }: Props) => {
  return (
    <div className='flex items-center justify-between py-4'>
      <p className='font-bold'>{habit.title}</p>
      <div className='flex items-center justify-between '>
        {habit.status === 'INCOMPLETE' && (
          <StatusUpdateButton habitId={habit.id} status='CHECK'>
            <Button className='flex gap-2' size='sm' variant={'outline'}>
              <Check /> Done
            </Button>
          </StatusUpdateButton>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <StatusUpdateButton
                className='flex gap-2 cursor-pointer'
                habitId={habit.id}
                status='CHECK'
              >
                <Check /> Check In
              </StatusUpdateButton>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <StatusUpdateButton
                className='flex gap-2 cursor-pointer'
                habitId={habit.id}
                status='SKIP'
              >
                <ArrowRight />
                Skip
              </StatusUpdateButton>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <StatusUpdateButton
                className='flex gap-2 cursor-pointer'
                habitId={habit.id}
                status='FAIL'
              >
                <X />
                Fail
              </StatusUpdateButton>
            </DropdownMenuItem>
            <DropdownMenuItem className='flex gap-2 cursor-pointer'>
              <Pen />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default HabitItem;
