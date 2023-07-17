import { Habit, Prisma } from '@prisma/client';
import HistoryDetails from './HistoryDetails';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import HabitOptions from './HabitOptions';
type Props = {
  habit: Prisma.HabitGetPayload<{
    include: {
      streak: true;
    };
  }>;
};

const HabitItem = async ({ habit }: Props) => {
  return (
    <div className=''>
      <Sheet>
        <div className='flex items-center justify-between py-4 cursor-pointer'>
          <SheetTrigger>
            <p className='font-bold'>{habit.title}</p>
          </SheetTrigger>
          <div className='flex items-center justify-between '>
            <HabitOptions habit={habit} />
          </div>
        </div>
        <SheetContent>
          <HistoryDetails habit={habit} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HabitItem;
