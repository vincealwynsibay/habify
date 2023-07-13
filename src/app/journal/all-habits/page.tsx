import React from 'react';
import Feed from '@/components/Feed';
import HabitForm from '@/components/HabitForm';

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <HabitForm />
      <Feed />
    </div>
  );
};

export default page;
