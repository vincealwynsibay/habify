'use client';

import { Habit } from '@prisma/client';
import React, { useEffect } from 'react';
import HabitItem from './HabitItem';
import { Separator } from './ui/Separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';

type Props = {
  habits: Habit[];
};

const History = ({ habits }: Props) => {
  const success: Habit[] = habits.filter((habit) => habit.status === 'CHECK');
  const fails: Habit[] = habits.filter((habit) => habit.status === 'FAIL');
  const skips: Habit[] = habits.filter((habit) => habit.status === 'SKIP');

  return (
    <div>
      {success.length > 0 && (
        <div>
          <Accordion type='single' defaultValue='item-1' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger>Success</AccordionTrigger>
              <AccordionContent>
                {success.map((habit) => {
                  return <HabitItem habit={habit} key={habit.id} />;
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator />
        </div>
      )}

      {fails.length > 0 && (
        <div>
          <Accordion type='single' defaultValue='item-1' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger>Fails</AccordionTrigger>
              <AccordionContent>
                {fails.map((habit) => {
                  return <HabitItem habit={habit} key={habit.id} />;
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator />
        </div>
      )}

      {skips.length > 0 && (
        <div>
          <Accordion type='single' defaultValue='item-1' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger>Skips</AccordionTrigger>
              <AccordionContent>
                {skips.map((habit) => {
                  return <HabitItem habit={habit} key={habit.id} />;
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator />
        </div>
      )}
    </div>
  );
};

export default History;
