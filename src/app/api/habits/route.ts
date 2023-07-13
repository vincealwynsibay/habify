import { authOptions, getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { HabitValidator } from '@/lib/validations/habit';
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

    if (!area) {
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

    console.log('error', error);
    return new Response('Could not create habit', { status: 500 });
  }
}
