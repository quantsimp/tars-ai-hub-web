import Link from 'next/link';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import _ from 'lodash';
import { IoMdClose } from 'react-icons/io';

import clsxm from '@/utils/clsxm';
import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useScrollToAnchor } from '@/hooks/scroll-to-anchor';
import { DynamicWidget } from '@dynamic-labs/sdk-react';

export default function Header2() {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const scrollToAnchor = useScrollToAnchor();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const anchor = router.query.anchor;
    if (anchor) {
      scrollToAnchor(anchor as string);
    }
  }, [router.query]);

  return (
    <header
      className={clsxm(
        'sticky top-0 left-0 z-40 w-full before:absolute before:inset-0 before:-z-10 before:block before:bg-[rgba(7,7,16,.7)] before:backdrop-blur-3xl before:transition before:ease-out',
        {
          'before:opacity-0': scrollPosition < 40,
        }
      )}
    >
      <div className=''>
        <div className='container flex h-[72px] items-center justify-between'>
          {/* logo */}
          <a href='https://tars.pro'>
            <img src='/images/logo.png' alt='' className='h-[78px] object-contain' />
          </a>

          {/* desktop menu start */}
          <>
            {/* menu links */}

            <div className='hidden h-full space-x-3 lg:flex 2xl:space-x-6'>
              <Link href='/' className='flex items-center hover:text-[#55ff79]'>
                Home
              </Link>

              <Link
                href='/?anchor=models'
                className='flex cursor-pointer items-center hover:text-[#55ff79]'
              >
                Explore
              </Link>
              <a className='relative flex cursor-default items-center'>
                UseAI2Earn
                <span className='absolute right-[-15px] top-[16px] rounded bg-[#55ff79] px-1 text-xs font-bold text-black'>
                  Soon
                </span>
              </a>
              <a className='relative flex cursor-default items-center'>
                Build2Earn
                <span className='absolute right-[-15px] top-[16px] rounded bg-[#55ff79] px-1 text-xs font-bold text-black'>
                  Soon
                </span>
              </a>
              <a
                href='https://docs.tars.pro/tars-ai-hub'
                className='flex items-center hover:text-[#55ff79]'
              >
                Litepaper
              </a>

              <div className='group relative flex cursor-pointer items-center hover:text-[#55ff79] 2xl:text-base'>
                <span className='flex items-center'>
                  Dashboard
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    id='chevron_down'
                    width='25'
                    height='25'
                    viewBox='0 0 25 25'
                    fill='none'
                  >
                    <path
                      d='M8.5 10.6914L12.5 14.6914L16.5 10.6914'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>
                  </svg>
                </span>
                <div className='absolute top-[70px] -left-24 z-50 hidden group-hover:block'>
                  <div className='relative mx-auto overflow-hidden rounded-3xl bg-gray-700/40 pt-3 pl-3 pr-4 pb-4 backdrop-blur-3xl lg:w-[480px] xl:w-[560px]'>
                    <div>
                      <a
                        onClick={() => router.push('/balance')}
                        className='flex items-center rounded-2xl p-3 text-lg font-medium transition duration-200 hover:bg-black'
                      >
                        <div className='mr-3 flex items-center rounded-xl bg-black/70 p-3'>
                          <img src='/images/icon/wallet.svg' alt='dApp' />
                        </div>
                        <div>
                          <span className='block  text-white'>My Access</span>
                          <p className='text-[13px] font-normal leading-4 text-white/40'>
                            Check Wallet Balance
                          </p>
                        </div>
                      </a>
                    </div>
                    <img
                      className='absolute bottom-0 left-0 right-0 -z-10 w-full'
                      src='/images/navbar-border-1.svg'
                      alt='Navbar border'
                      loading='lazy'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* last cols */}
            <div className='hidden shrink-0 items-center space-x-6 lg:flex 2xl:space-x-5'>
              {/* <Network /> */}
              <DynamicWidget innerButtonComponent={'Connect Wallet'} />
            </div>
          </>
          {/* desktop menu end */}

          {/* mobile menu start */}
          <>
            <Disclosure as='div' className='lg:hidden'>
              <Disclosure.Button className=''>
                <img src='/images/hamburger.svg' alt='' className='block h-6 w-6' />
              </Disclosure.Button>

              {/* menu dropdown start */}
              <Disclosure.Panel className='fixed top-0 left-0 z-40 block w-full touch-none overflow-hidden rounded-b-2xl bg-black'>
                <div className='flex h-[72px] items-center justify-between px-5'>
                  <a href='https://tars.pro'>
                    <img src='/images/logo.png' alt='' className='h-[78px] object-contain' />
                  </a>
                  <Disclosure.Button className='relative'>
                    <IoMdClose className='h-6 w-6' />
                  </Disclosure.Button>
                </div>
                <div className='max-h-[calc(100%-120px)] overflow-auto'>
                  <div className='mx-4'>
                    {/* mobile menu item start */}
                    <div className='group flex flex-col justify-between overflow-hidden border-b border-white/25 text-base font-medium text-white/80'>
                      <Link
                        href='/'
                        className='flex h-16 items-center justify-between group-hover:text-white'
                      >
                        Home
                      </Link>
                    </div>
                    <div className='group flex flex-col justify-between overflow-hidden border-b border-white/25 text-base font-medium text-white/80'>
                      <Link
                        href='/?anchor=models'
                        className='flex h-16 cursor-pointer items-center justify-between group-hover:text-white'
                      >
                        Explore
                      </Link>
                    </div>
                    {/* mobile menu item end */}

                    <div className='group flex flex-col justify-between overflow-hidden border-b border-white/25 text-base font-medium text-white/80'>
                      <a className='relative flex h-16 cursor-pointer items-center justify-between group-hover:text-white'>
                        UseAI2Earn
                        <span className='absolute right-0 top-[24px] rounded bg-[#f3ba2c] px-1 text-sm font-bold text-white/80'>
                          Soon
                        </span>
                      </a>
                    </div>

                    <div className='group flex flex-col justify-between overflow-hidden border-b border-white/25 text-base font-medium text-white/80'>
                      <a className='relative flex h-16 cursor-pointer items-center justify-between group-hover:text-white'>
                        Build2Earn
                        <span className='absolute right-0 top-[24px] rounded bg-[#f3ba2c] px-1 text-sm font-bold text-white/80'>
                          Soon
                        </span>
                      </a>
                    </div>

                    <div className='group flex flex-col justify-between overflow-hidden border-b border-white/25 text-base font-medium text-white/80'>
                      <a
                        href='https://docs.tars.pro/tars-ai-hub'
                        className='flex h-16 cursor-pointer items-center justify-between group-hover:text-white'
                      >
                        Litepaper
                      </a>
                    </div>

                    {/* mobile menu item end */}
                    <div className='group flex flex-col justify-between overflow-hidden border-b border-white/25 text-base font-medium text-white/80'>
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className='flex h-16 items-center justify-between group-hover:text-white'>
                              Dashboard
                              <svg
                                className={open ? 'rotate-180' : 'rotate-0'}
                                xmlns='http://www.w3.org/2000/svg'
                                width='25'
                                height='25'
                                viewBox='0 0 25 25'
                                fill='none'
                              >
                                <path
                                  d='M8.5 10.6914L12.5 14.6914L16.5 10.6914'
                                  stroke='currentColor'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                ></path>
                              </svg>
                            </Disclosure.Button>
                            <Disclosure.Panel className='w-full'>
                              <a
                                onClick={() => router.push('/balance')}
                                className='mb-6 block h-4 pl-4 hover:text-white'
                              >
                                My Access
                              </a>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                    {/* mobile menu item end */}

                    <div className='flex justify-center p-4'>
                      <DynamicWidget innerButtonComponent={'Connect Wallet'} />
                    </div>
                  </div>
                </div>
              </Disclosure.Panel>
              {/* menu dropdown end */}
            </Disclosure>
          </>
          {/* mobile menu end */}
        </div>
      </div>
    </header>
  );
}
