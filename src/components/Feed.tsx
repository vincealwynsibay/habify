import React from 'react';
import { Separator } from '@/components/ui/Separator';
import HabitItem from './HabitItem';
import { Habit, Prisma } from '@prisma/client';
import History from './History';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

type Props = {
  habits: Prisma.HabitGetPayload<{
    include: {
      streak: true;
    };
  }>[];
};

const Feed = ({ habits }: Props) => {
  return (
    <div className='container max-w-7xl'>
      {habits?.length &&
        habits.map((habit) => {
          if (habit.status === 'INCOMPLETE') {
            return (
              <>
                <HabitItem key={habit.id} habit={habit} />
                <Separator />
              </>
            );
          }
        })}

      <History habits={habits} />
      {!habits?.length && (
        <div>
          <p>
            Start adding habits now to get started with your productive life.
          </p>
        </div>
      )}
    </div>
  );
};

export default Feed;
