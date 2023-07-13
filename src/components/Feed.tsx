import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { useQuery } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import React from 'react';
import { Separator } from '@/components/ui/Separator';
import HabitItem from './HabitItem';
import { useSession } from 'next-auth/react';

type Props = {};

const Feed = async (props: Props) => {
  const session = await getAuthSession();

  if (!session) {
    redirect('/sign-in');
  }

  const habits = await db.habit.findMany({
    where: {
      userId: session.user.id,
    },
  });

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
