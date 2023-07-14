import React from 'react';
import { Separator } from '@/components/ui/Separator';
import HabitItem from './HabitItem';
import { Habit } from '@prisma/client';

type Props = {
  habits: Habit[];
};

const Feed = ({ habits }: Props) => {
  return (
    <div className='container max-w-7xl'>
      {habits?.length ? (
        habits.map((habit) => {
          return (
            <>
              <HabitItem key={habit.id} habit={habit} />
              <Separator />
            </>
          );
        })
      ) : (
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
