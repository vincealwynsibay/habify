import { authOptions, getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { HabitStatusValidator, HabitValidator } from '@/lib/validations/habit';
import { History } from '@prisma/client';
import { ZodError } from 'zod';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      throw new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const { title, frequency, target, timeOfDay, timeframe } =
      HabitValidator.parse(body);

    let area = await db.area.findFirst({
      where: {
        userId: session.user.id,
        title: 'All Habits',
      },
    });

    if (!area) {
      area = await db.area.create({
        data: {
          userId: session.user.id,
          title: 'All Habits',
        },
      });
    }

    const habit = await db.habit.create({
      data: {
        title,
        frequency,
        target,
        timeOfDay,
        timeframe,
        userId: session.user.id,
        areaId: area.id,
      },
    });

    return new Response(habit.title);
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Could not create habit', { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { status, id } = HabitStatusValidator.parse(body);

    const habit = await db.habit.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    console.log(habit);

    if (!habit) {
      return new Response('Habit not found.', { status: 404 });
    }

    // Update history
    if (status !== 'INCOMPLETE') {
      await db.history.create({
        data: {
          habitId: habit.id,
          status: habit.status!,
        },
      });
    } else {
      const history = await db.history.findFirst({
        where: {
          habitId: habit.id,
        },
      });

      console.log(history);

      if (!history) {
        return new Response('History not found.', { status: 404 });
      }

      await db.history.delete({
        where: {
          id: history!.id,
          habitId: habit.id,
        },
      });
    }

    return new Response(status);
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Could not update habit', { status: 500 });
  }
}
