'use client';

import { Package } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button, buttonVariants } from './ui/Button';
import { cn } from '@/lib/utils';
import UserAccountNav from './UserAccountNav';
import { Session } from 'next-auth';

type Props = {
  session: Session | null;
};

const Navbar = ({ session }: Props) => {
  const [open, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        data-drawer-target='default-sidebar'
        data-drawer-toggle='default-sidebar'
        aria-controls='default-sidebar'
        variant={'ghost'}
        className='block sm:hidden'
        onClick={() => setIsOpen(true)}
      >
        <svg
          className='w-6 h-6 cursor-pointer'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            clipRule='evenodd'
            fillRule='evenodd'
            d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
          ></path>
        </svg>
      </Button>

      <aside
        id='default-sidebar'
        className={cn(
          'fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0',
          open && 'translate-x-0'
        )}
      >
        <div
          className={cn(
            'h-full px-3 py-4 pt-8 overflow-y-auto bg-white',
            !session && 'flex flex-col justify-between'
          )}
        >
          {session?.user && (
            <UserAccountNav className='px-1 py-2 ' user={session.user} />
          )}
          <Link
            href='/'
            className='flex items-center gap-2 px-1 py-2 rounded-sm hover:bg-gray-100'
          >
            <Package />
            <p className='block text-sm font-medium'>Habify</p>
          </Link>
          <div className='flex gap-2 justify-self-end'>
            <Link
              href='/sign-in'
              className={buttonVariants({ variant: 'default' })}
            >
              <p className='block text-sm font-medium'>Sign In</p>
            </Link>
            <Link
              href='/sign-up'
              className={buttonVariants({ variant: 'outline' })}
            >
              <p className='block text-sm font-medium'>Sign Up</p>
            </Link>
          </div>
        </div>
      </aside>
      {open && (
        <div
          className='absolute inset-0 z-10 bg-gray-100'
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
