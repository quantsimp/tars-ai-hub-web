import { HomeDataContainer } from '@/containers';
import { useScrollToAnchor } from '@/hooks/scroll-to-anchor';
import { MagnifyingGlass } from 'phosphor-react';
import { useState } from 'react';
import { KeyboardEvent } from 'react';

export default function Hero() {
  const [tempKeyword, setTempKeyword] = useState<string>('');
  const { setKeyword } = HomeDataContainer.useContainer();

  const scrollToAnchor = useScrollToAnchor();

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setKeyword(tempKeyword);
      scrollToAnchor('models');
    }
  };

  const onSearch = () => {
    setKeyword(tempKeyword);
    scrollToAnchor('models');
  };
  return (
    <div className='relative border-b border-primary'>
      <img
        src='/images/hero-pattern.png'
        alt=''
        className='absolute left-0 top-0 h-full w-full object-cover object-left'
      />
      <div className='container relative z-10 flex items-center space-x-16'>
        <div className='flex w-full flex-col items-center py-12 lg:w-auto lg:items-start lg:py-24'>
          <h1 className='text-center text-4xl font-semibold text-white lg:text-left lg:text-5xl'>
            TARS AI Hub
          </h1>
          <p className='mt-2 text-center text-xl font-light text-neutral-400 lg:text-left lg:text-2xl'>
            Unlock the Power of AI with Web3, powered by TARS Protocol.
          </p>
          <div className='relative mt-5 flex h-14 w-full max-w-xl items-center overflow-hidden rounded-lg border-2 border-primary bg-[#0E1F16]'>
            <button
              className='absolute right-4 flex h-full items-center'
              aria-label='Search'
              onClick={onSearch}
            >
              <MagnifyingGlass className='h-6 w-6 text-gray-500' />
            </button>
            <input
              type='text'
              placeholder='Search AI Models and Categories'
              className='placeholder:text-shade-500 h-full w-full border-none bg-transparent p-0 pl-5 font-normal text-white focus:ring-0'
              value={tempKeyword}
              onChange={(e) => setTempKeyword(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </div>
          <div className='mt-8 inline-flex flex-col items-center md:flex-row'>
            <div className='mb-3 text-lg font-medium text-white md:mb-0 md:mr-3'>
              Supporting tokens on
            </div>
            <div className='flex items-center -space-x-3'>
              <img src='/images/chains/bsc.svg' alt='' className='block h-11 w-11 shrink-0' />
              <img src='/images/chains/eth.svg' alt='' className='block h-11 w-11 shrink-0' />
              <img src='/images/chains/polygon.svg' alt='' className='block h-11 w-11 shrink-0' />
              <img src='/images/chains/solana.svg' alt='' className='block h-11 w-11 shrink-0' />
              <img src='/images/chains/dot.svg' alt='' className='block h-11 w-11 shrink-0' />
              <img src='/images/chains/aptos.svg' alt='' className='block h-11 w-11 shrink-0' />
              <img src='/images/chains/sui.svg' alt='' className='block h-11 w-11 shrink-0' />
              <img src='/images/chains/arbitrum.svg' alt='' className='block h-11 w-11 shrink-0' />
              <img src='/images/chains/zksync.svg' alt='' className='block h-11 w-11 shrink-0' />
              <img src='/images/chains/azero.svg' alt='' className='block h-11 w-11 shrink-0' />
            </div>
          </div>
        </div>
        <div className='hidden min-w-0 flex-1 justify-end py-6 lg:flex'>
          <img src='/images/hero-image.svg' alt='' className='aspect-square min-w-0 max-w-md' />
        </div>
      </div>
    </div>
  );
}
