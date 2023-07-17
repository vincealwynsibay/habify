import { Habit, Prisma } from '@prisma/client';
import HabitDetails from './HabitDetails';
type Props = {
  habit: Prisma.HabitGetPayload<{
    include: {
      streak: true;
    };
  }>;
};

const HabitItem = async ({ habit }: Props) => {
  return (
    <div>
      <HabitDetails habit={habit} />
      <div>
        <p>
          SUCCESS:{' '}
          {habit.streak.reduce((count, history) => {
            if (history.status === 'CHECK') {
              return count + 1;
            } else {
              return count;
            }
          }, 0)}
        </p>
        <p>
          FAIL:{' '}
          {habit.streak.reduce((count, history) => {
            if (history.status === 'FAIL') {
              return count + 1;
            } else {
              return count;
            }
          }, 0)}
        </p>
        <p>
          SKIP:{' '}
          {habit.streak.reduce((count, history) => {
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

export default HabitItem;
