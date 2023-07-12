import UserAuthForm from '@/components/UserAuthForm';
import Link from 'next/link';

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className='container flex flex-col justify-center mx-auto space-y-6'>
        <UserAuthForm />
        <p>
          New to Habify? <Link href='/sign-up'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default page;
