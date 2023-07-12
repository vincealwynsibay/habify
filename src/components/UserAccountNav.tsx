import { User } from 'next-auth';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'email' | 'image'>;
}

const UserAccountNav = async ({ user, className }: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className='w-10 h-10'>
            <AvatarImage src={user.image!} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white' align='end'>
          <div className='flex items-center justify-start gap-2 p-2'>
            <div className='flex flex-col space-y-1 leading-none'>
              {user.name && <p className='font-medium'>{user.name}</p>}
              {user.email && (
                <p className='w-[200px] truncate text-sm text-muted-foreground'>
                  {user.email}
                </p>
              )}
            </div>
          </div>
          <DropdownMenuSeparator />

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='cursor-pointer'
            onSelect={(event) => {
              event.preventDefault();
              signOut({
                callbackUrl: `${window.location.origin}/sign-in`,
              });
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAccountNav;
