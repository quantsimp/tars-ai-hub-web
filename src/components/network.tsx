import { Menu } from '@headlessui/react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

export default function Network() {
  const { chain, chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  return (
    <Menu as='div' className='relative inline-block text-left'>
      {chain && !chain.unsupported && (
        <Menu.Button className='flex items-center text-white/80 transition duration-200 hover:text-white'>
          {/* {chain.id === 1 && (
            <img className='mr-4 h-6 w-6' src='/images/icon/ethereum_icon.svg' alt='zh' />
          )} */}
          {chain.id === 56 && (
            <>
              <img
                className='mr-2 h-6 w-6'
                src='/images/icon/bnb_chain.svg'
                alt='bnb_chain_network'
              />
              <span>BNB Chain</span>
            </>
          )}

          <svg
            className=''
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
        </Menu.Button>
      )}
      {chain && chain.unsupported && (
        <Menu.Button className='flex items-center text-white/80 transition duration-200 hover:text-white'>
          unsupported chain
        </Menu.Button>
      )}
      <Menu.Items className='absolute -right-5 mt-2 w-[516px] origin-top-right overflow-hidden rounded-3xl bg-gray-700/40 p-6 backdrop-blur-3xl'>
        <div className='mb-6 flex justify-between border-b border-[#37445a] pb-4'>
          <p className='text-xl font-medium leading-6 text-white'>Change Network</p>
          <Menu.Item as='button' className='-m-2 p-2'>
            <svg
              className='h-6 w-6'
              xmlns='http://www.w3.org/2000/svg'
              id='close'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929Z'
                fill='currentColor'
              ></path>
            </svg>
          </Menu.Item>
        </div>

        <div className='grid grid-cols-2 gap-x-6 gap-y-1'>
          {chains.map((o, index) => (
            <Menu.Item
              as='a'
              disabled={!switchNetwork || o.id === chain?.id}
              onClick={() => switchNetwork?.(o.id)}
              key={index}
              className='flex cursor-pointer items-center rounded-lg border border-transparent py-3 px-4 text-base font-medium leading-none text-white/80 transition duration-200 hover:border-[rgba(50,64,84,.3)] hover:bg-[rgba(32,40,53,.3)] hover:text-white'
            >
              {o.id === 1 && (
                <>
                  <img className='mr-4 h-6 w-6' src='/images/icon/ethereum_icon.svg' alt='zh' />
                  <span>{o.name}</span>
                </>
              )}
              {o.id === 56 && (
                <>
                  <img
                    className='mr-4 h-6 w-6'
                    src='/images/icon/bnb_chain.svg'
                    alt='bnb_chain_network'
                  />
                  <span>BNB Chain</span>
                </>
              )}
            </Menu.Item>
          ))}
        </div>

        <img
          className='absolute bottom-0 left-0 right-0 -z-10 w-full'
          src='/images/navbar-border-1.svg'
          alt='Navbar border'
          loading='lazy'
        />
      </Menu.Items>
    </Menu>
  );
}
