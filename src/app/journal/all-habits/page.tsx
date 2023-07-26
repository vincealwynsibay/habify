import React from 'react';
import Feed from '@/components/Feed';
import HabitForm from '@/components/HabitForm';

import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import HabitFormDialogCustom from '@/components/HabitFormDialogCustom';

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();
   if (!session) 
    redirect('/sign-in');
  }

  const habits = await db.habit.findMany({
    where: {
      userId: session.user.id,
      created_at: {
        gte: new Date(new Date().toISOString().split('T')[0]),
      },
    },
    include: {
      streak: true,
    },
  });

  // TODO: REINITIALIZE HABITS BY 12:00 midnight
  // TODO: FLUSH HABITS AND UPDATE STATUS TO INCOMPLETE
  // SHOW TODAY HABITS ONLY

  // await db.habit.deleteMany({
  //   where: {
  //     created_at: {
  //       lt: new Date(new Date().toISOString().split('T')[0]),
  //     },
  //   },
  // });

  return (
    <div>
      <p></p>
      //{' '}
      {session && (
        //     <>
        <HabitForm />
                // <HabitFormDialogCustom /> 
       <Feed habits={habits} />
        //     </>
      )}
    </div>
  );
};

export default page;
