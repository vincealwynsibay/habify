'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import {
  Check,
  MoreVertical,
  ArrowRight,
  X,
  Pen,
  RotateCcw,
} from 'lucide-react';
import StatusUpdateButton from './StatusUpdateButton';
import { Button } from '@/components/ui/Button';
import { Prisma } from '@prisma/client';

type Props = {
  habit: Prisma.HabitGetPayload<{
    include: {
      streak: true;
    };
  }>;
};

const HabitOptions = ({ habit }: Props) => {
  return (
    <>
      {habit.status === 'INCOMPLETE' ? (
        <>
          <StatusUpdateButton habitId={habit.id} status='CHECK'>
            <Button className='flex gap-2' size='sm' variant={'outline'}>
              <Check /> Done
            </Button>
          </StatusUpdateButton>
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
        </>
      ) : (
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
                status='INCOMPLETE'
              >
                <RotateCcw /> Undo{' '}
                {habit.status?.slice(0, 1)! +
                  habit.status?.slice(1).toLowerCase()!}
              </StatusUpdateButton>
            </DropdownMenuItem>
            <DropdownMenuItem className='flex gap-2 cursor-pointer'>
              <Pen />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default HabitOptions;
