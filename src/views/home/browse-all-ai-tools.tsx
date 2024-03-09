import IconApproved from '~/icons/icon-approved.svg';
import IconTars from '~/icons/icon-tars.svg';
import clsxm from '@/utils/clsxm';

import { LinkButton } from '@/components/button';
import { useState } from 'react';
import { Tool } from '@/hooks/home-data';
import { HomeDataContainer } from '@/containers';

const BrowseCard = ({
  imageSrc,
  title,
  approved,
  description,
  launch,
  detail,
  ribbon,
  disabled,
  showStaking = true,
  model,
  task,
  input_type,
  output_type
}: Tool) => {
  const [showSoon, setShowSoon] = useState(false);
  const isSoon = launch.text === 'Soon!';
  return (
    <div className='inline-block p-6 align-middle lg:p-3'>
      <div className='relative h-full w-full max-w-sm'>
        {!!ribbon && (
          <div className='pointer-events-none absolute -right-2 -top-2 z-20 h-28 w-28 overflow-hidden rounded-sm'>
            <div className='absolute top-0 left-0 h-2 w-2 bg-primary-dark'></div>
            <div className='absolute bottom-0 right-0 h-2 w-2 bg-primary-dark'></div>

            <div className='text-md pointer-events-auto absolute right-0 bottom-0 w-[141.42%] origin-bottom-right rotate-45 bg-primary py-1 text-center font-medium text-black shadow-md'>
              <span className='line-through '>{ribbon}</span>
              <span> Free</span>
            </div>
          </div>
        )}
        <img
          src={imageSrc}
          alt=''
          className='absolute left-0 top-0 block h-56 w-full rounded-lg object-cover blur-2xl'
        />
        <div className='relative z-10 flex h-full flex-col items-start rounded-2xl border border-primary-darker bg-[#080E0B] p-5'>
          <div className=''>
            <img
              src={imageSrc}
              alt=''
              className={clsxm('block h-56 w-full rounded-xl object-cover', {
                'opacity-40': disabled,
              })}
            />
          </div>
          <div className='mt-4 inline-flex items-center space-x-2'>
            <h4 className='text-2xl font-semibold text-white'>{title}</h4>
            {approved && <IconApproved className='h-6 w-6 shrink-0' />}
          </div>
          <p className='mt-4 text-sm text-white'>{description}</p>
          {showStaking && (
            <div className='mt-5 inline-flex items-center space-x-2 rounded-md bg-white py-2 px-2.5 text-primary-darker'>
              <IconTars className='h-5 w-5 shrink-0' />
              <span className='text-sm'>Crypto Required</span>
            </div>
          )}
          <div className='mt-auto w-full'>
            <div className='mt-6 space-y-3'>
              {!isSoon && (
                <LinkButton href={launch.url} model={{
                    task: task,
                    model: model,
                    input_type: input_type,
                    output_type: output_type
                  }} fluid variant={launch.variant as any}>
                  {launch.text}
                </LinkButton>
              )}
              {isSoon && (
                <>
                  {!showSoon && (
                    <LinkButton
                      href={'javscript:;'}
                      fluid
                      variant='primary'
                      onClick={() => setShowSoon(true)}
                    >
                      Launch {showSoon}
                    </LinkButton>
                  )}
                  {showSoon && (
                    <LinkButton href={launch.url} fluid variant={launch.variant as any}>
                      {launch.text}
                    </LinkButton>
                  )}
                </>
              )}
              <LinkButton href={detail.url} fluid variant={detail.variant as any}>
                {detail.text}
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BrowseAllAiTools() {
  const { tools } = HomeDataContainer.useContainer();
  return (
    <>
      <div className='container'>
        <h2 className='text-4xl font-bold text-primary'>Discover AI Models Library</h2>
        <p className='mt-2.5 text-base text-gray-400'>
          Seamless access to popular AI models for Web3 users
        </p>
        <div className='-m-6 mt-1 flex max-w-full flex-wrap justify-center lg:-m-3 lg:mt-4 xl:justify-start'>
          {tools.map((o, i) => (
            <BrowseCard key={i} {...o} />
          ))}
        </div>
      </div>
    </>
  );
}
