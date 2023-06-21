import * as React from 'react';
import { Tab } from '@headlessui/react';
import { IoMdArrowForward } from 'react-icons/io';

import clsxm from '@/utils/clsxm';
import Link from 'next/link';

const StyledTab = ({ children }: { children: React.ReactNode }) => (
  <Tab
    className={({ selected }) =>
      clsxm('border-b-2 py-2 text-base focus:outline-none', {
        'border-b-primary text-white': selected,
        'border-b-transparent text-gray-300': !selected,
      })
    }
  >
    {children}
  </Tab>
);

const StyledPanel = ({ children }: { children: React.ReactNode }) => (
  <Tab.Panel className='py-5 leading-relaxed text-white'>{children}</Tab.Panel>
);

export default function DetailTabs() {
  return (
    <Tab.Group>
      <Tab.List className='space-x-6 border-b border-gray-800'>
        <StyledTab>Description</StyledTab>
      </Tab.List>
      <Tab.Panels>
        <StyledPanel>
          <div className='mt-6 rounded-lg bg-primary-darker p-10 text-secondary'>
            <div className='grid gap-6 md:grid-cols-2'>
              <div>
                <h4 className='text-4xl'>
                  AudioLDM generates text-conditional sound effects, human speech, and music. It
                  enables zero-shot text-guided audio style-transfer, inpainting, and
                  super-resolution.
                </h4>
                <Link
                  href='/app/dalle2'
                  className='mt-6 inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2.5 text-sm font-medium text-primary-darker'
                >
                  <span className='mr-2'>Try Text-To-Audio</span>
                  <IoMdArrowForward className='h-5 w-5' />
                </Link>
              </div>
              <div>
                <img
                  src='/images/text-to-audio/cover.png'
                  alt=''
                  className='w-full min-w-0 object-contain'
                />
              </div>
            </div>
          </div>
        </StyledPanel>
      </Tab.Panels>
    </Tab.Group>
  );
}
