'use client';

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

type Props = {
  habit: Habit;
};

const HabitItem = ({ habit }: Props) => {
  return (
    <div className='flex items-center justify-between py-4'>
      <p className='font-bold'>{habit.title}</p>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Check /> Check In
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArrowRight />
            Skip
          </DropdownMenuItem>
          <DropdownMenuItem>
            <X />
            Fail
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pen />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HabitItem;
