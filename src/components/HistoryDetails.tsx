import React from 'react';
import { Prisma } from '@prisma/client';

type Props = {
  habit: Prisma.HabitGetPayload<{
    include: {
      streak: true;
    };
  }>;
};

const HistoryDetails = ({ habit }: Props) => {
  return (
    <div>
      <div>
        <p>
          SUCCESS:{' '}
          {habit.streak.reduce((count: number, history: any) => {
            if (history.status === 'CHECK') {
              return count + 1;
            } else {
              return count;
            }
          }, 0)}
        </p>
        <p>
          FAIL:{' '}
          {habit.streak.reduce((count: number, history: any) => {
            if (history.status === 'FAIL') {
              return count + 1;
            } else {
              return count;
            }
          }, 0)}
        </p>
        <p>
          SKIP:{' '}
          {habit.streak.reduce((count: number, history: any) => {
            if (history.status === 'SKIP') {
              return count + 1;
            } else {
              return count;
            }
          }, 0)}
        </p>
      </div>
    </div>
  );
};

export default HistoryDetails;
