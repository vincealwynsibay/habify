'use client';

import React, { useState } from 'react';
import { Button } from './ui/Button';
import { signIn } from 'next-auth/react';
import { Icons } from './Icons';
import { Loader2 } from 'lucide-react';
import { toast } from '../hooks/use-toast';

type Props = {};

const UserAuthForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = () => {
    setIsLoading(() => true);
    try {
      signIn('google');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(() => false);
    }
  };

  const loginWithGithub = () => {
    setIsLoading(() => true);
    try {
      signIn('github');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Github',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(() => false);
    }
  };

  return (
    <div>
      <Button
        onClick={loginWithGoogle}
        variant={'default'}
        size={'sm'}
        disabled={isLoading}
        className='flex gap-2'
      >
        {isLoading ? <Loader2 /> : null}
        <Icons.google className='w-4 h-4' />
        Google
      </Button>
      <Button
        onClick={loginWithGithub}
        variant={'default'}
        size={'sm'}
        disabled={isLoading}
        className='flex gap-2'
      >
        {isLoading ? <Loader2 /> : null}
        <Icons.github className='w-4 h-4 fill-white' />
        Github
      </Button>
    </div>
  );
};

export default UserAuthForm;
