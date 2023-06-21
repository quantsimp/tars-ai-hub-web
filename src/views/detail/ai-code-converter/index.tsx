import Link from 'next/link';
import { IoMdArrowBack } from 'react-icons/io';
import IconApproved from '~/icons/icon-approved.svg';

import DetailTabs from './Tabs';
import GettingStarted from '@/components/getting-started';

export default function ViewDetail() {
  return (
    <div className='container'>
      {/* breadcrumb */}
      <div className='my-10'>
        <Link href='/' className='inline-flex items-center space-x-2'>
          <IoMdArrowBack className='h-5 w-5 text-primary' />
          <span className='text-lg text-primary'>Discover AI Models Library</span>
        </Link>
      </div>

      <div className='my-10 space-y-12 lg:flex lg:space-y-0 lg:space-x-14'>
        <div className='flex-1'>
          <div className='inline-flex items-center space-x-2'>
            <h1 className='text-2xl font-semibold text-white'>Code-Converter</h1>
            <IconApproved className='h-6 w-6 shrink-0' />
          </div>

          <div className='mt-3'>
            <DetailTabs />
          </div>
          <div className='my-16'>
            <GettingStarted />
          </div>
        </div>
      </div>
    </div>
  );
}
