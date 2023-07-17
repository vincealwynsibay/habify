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

  if (!session) {
    redirect('/sign-in');
  }

  const habits = await db.habit.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      streak: true,
    },
  });

  return (
    <div>
      {/* <HabitFormDialogCustom /> */}
      {session && (
        <>
          <HabitForm />
          <Feed habits={habits} />
        </>
      )}
    </div>
  );
};

export default page;
