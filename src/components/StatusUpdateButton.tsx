'use client';

import React from 'react';
import { Status } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { HabitUpdateStatusPayload } from '@/lib/validations/habit';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  habitId: string;
  status: Status;
}

const StatusUpdateButton = ({ children, habitId, status, ...props }: Props) => {
  const router = useRouter();
  const { mutate: updateButton } = useMutation({
    mutationFn: async () => {
      const payload: HabitUpdateStatusPayload = {
        id: habitId,
        status,
      };

      const { data } = await axios.patch('/api/habits', payload);
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
            title: 'Invalid Status Update.',
            description: 'Please provide the required data.',
            variant: 'destructive',
          });
        }

        console.log(err);

        return toast({
          title: 'There was an error.',
          description: 'Could not update status.',
          variant: 'destructive',
        });
      }
    },

    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div {...props} onClick={() => updateButton()}>
      {children}
    </div>
  );
};

export default StatusUpdateButton;
