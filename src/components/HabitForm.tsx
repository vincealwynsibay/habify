'use client';

import React, { useState } from 'react';
import { Button } from './ui/Button';
import { useForm } from 'react-hook-form';
import {
  Frequency,
  HabitFormationFormData,
  HabitFormationPayload,
  HabitValidator,
  TimeOfDay,
  Timeframe,
} from '@/lib/validations/habit';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/Form';
import { Input } from '@/components/ui/Input';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

type Props = {};

const timeOfDays = ['ANY', 'MORNING', 'AFTERNOON', 'NIGHT'];

const timeframes = ['HOUR', 'DAY', 'WEEK', 'MONTH'];

const frequencies = [
  'DAILY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

const HabitForm = (props: Props) => {
  const router = useRouter();

  const form = useForm<HabitFormationFormData>({
    resolver: zodResolver(HabitValidator),
    defaultValues: {
      title: '',
      target: 1,
      timeframe: 'DAY',
      frequency: 'DAILY',
      timeOfDay: 'ANY',
    },
  });

  const { mutate: addHabit } = useMutation({
    mutationFn: async ({
      title,
      target,
      frequency,
      timeOfDay,
      timeframe,
    }: HabitFormationPayload) => {
      const payload: HabitFormationPayload = {
        title,
        target,
        frequency,
        timeOfDay,
        timeframe,
      };
      const { data } = await axios.post('/api/habits', payload);

      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast({
            title: 'Not Logged In.',
            description: 'Please login first before creating habits.',
            variant: 'destructive',
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid Habit Data.',
            description: 'Please provide the required data.',
            variant: 'destructive',
          });
        }

        return toast({
          title: 'There was an error.',
          description: 'Could not create habit.',
          variant: 'destructive',
        });
      }
    },
    onSuccess: () => {
      toast({
        title: 'nice',
        variant: 'default',
      });
      router.refresh();
    },
  });

  const onSubmit = async (data: HabitFormationFormData) => {
    const payload = {
      title: data.title,
      target: data.target,
      timeframe: data.timeframe,
      frequency: data.frequency,
      timeOfDay: data.timeOfDay,
    };
    await addHabit(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='habit #1' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='target'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target</FormLabel>
              <FormControl>
                <Input type='number' {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='timeframe'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timeframe</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) =>
                    field.onChange(Timeframe.parse(value))
                  }
                  defaultValue={field.value}
                >
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Per day' />
                  </SelectTrigger>
                  <SelectContent>
                    {timeframes.map((timeframe, idx) => {
                      return (
                        <SelectItem value={timeframe} key={idx}>
                          Per{' '}
                          {timeframe.slice(0, 1) +
                            timeframe.slice(1).toLowerCase()}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='frequency'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value: string) =>
                    field.onChange(Frequency.parse(value))
                  }
                  defaultValue={field.value}
                >
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Per day' />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map((frequency, idx) => {
                      return (
                        <SelectItem value={frequency} key={idx}>
                          {frequency.slice(0, 1) +
                            frequency.slice(1).toLowerCase()}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='timeOfDay'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time of Day</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value: string) =>
                    field.onChange(TimeOfDay.parse(value))
                  }
                  defaultValue={field.value}
                >
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='All Day' />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOfDays.map((time, idx) => {
                      return (
                        <SelectItem value={time} key={idx}>
                          {time.slice(0, 1) + time.slice(1).toLowerCase()}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default HabitForm;
