import { authOptions, getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { HabitValidator } from '@/lib/validations/habit';
import { History } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { ZodError } from 'zod';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const { title, frequency, target, timeOfDay, timeframe } =
      HabitValidator.parse(body);
    console.log({ title, frequency, target, timeOfDay, timeframe });
    console.log('session1', session.user);

    const habit = await db.habit.create({
      data: {
        title,
        frequency,
        target,
        timeOfDay,
        timeframe,
        userId: session.user.id,
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
