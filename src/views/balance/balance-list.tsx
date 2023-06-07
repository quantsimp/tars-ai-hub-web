import { EvmCheckBalanceContainer, SolanaCheckBalanceContainer } from '@/containers';
import { Token } from '@/hooks/evm-check-balance';
import { chainLogoByChainId, fixedNumberFormat } from '@/utils/helper';
import { useDynamicContext } from '@dynamic-labs/sdk-react';
import _ from 'lodash';
import { MagnifyingGlass } from 'phosphor-react';
import { useState } from 'react';
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io';

export function tokenFilterFn(o: Token | any, keyword?: string) {
  return !keyword || o.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
}

export default function BalanceList() {
  const { data: evmTokens, isLoading: evmTokensIsLoading } =
    EvmCheckBalanceContainer.useContainer();
  const [keyword, setKeyword] = useState<string>('');

  const { primaryWallet } = useDynamicContext();

  const isOnSolana = primaryWallet?.chain === 'solana';

  const { data: solanaTokens, isLoading: solanaTokensIsLoading } =
    SolanaCheckBalanceContainer.useContainer();

  const sortedEvmTokens = _.sortBy(
    evmTokens?.filter((o) => tokenFilterFn(o, keyword)).reverse(),
    'pass'
  ).reverse();

  const sortedSolanaTokens = _.sortBy(
    solanaTokens?.filter((o) => tokenFilterFn(o, keyword)).reverse(),
    'pass'
  ).reverse();

  return (
    <div className='flex-1'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <div className='text-2xl font-semibold'>Balance Overview</div>
          <div className='rounded-md bg-neutral-700 py-1.5 px-2.5 text-xl leading-none'>
            {evmTokens && solanaTokens && evmTokens.length + solanaTokens.length}
          </div>
        </div>
        <div className=''>
          <div className='relative'>
            <div className='pointer-events-none absolute left-2 flex h-full items-center'>
              <MagnifyingGlass className='h-5 w-5 text-neutral-400' />
            </div>
            <input
              type='text'
              placeholder='Search Asset'
              className='h-9 w-56 rounded border-0 bg-zinc-900 pl-9 focus:outline-0 focus:ring-zinc-700'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <div className='hidden items-center rounded bg-zinc-800 py-1.5 text-neutral-300 md:flex'>
          <div className='flex w-6/12 min-w-0 items-center justify-between px-6'>
            <span className='pl-15'>Token Name</span>
          </div>
          <div className='w-3/12 min-w-0 px-6'>
            <span className=''>Current Balance</span>
          </div>
          <div className='w-3/12 min-w-0 px-6'>
            <span className=''>Required Balance</span>
          </div>
          <div className='w-3/12 min-w-0 px-6'>
            <span className=''>Eligibility Status</span>
          </div>
          <div className='px-6'>
            <div className='min-w-[126px]'></div>
          </div>
        </div>
        <div className='space-y-3 md:mt-2.5'>
          {(evmTokensIsLoading || solanaTokensIsLoading) && <span>loading...</span>}
          {!evmTokensIsLoading && !solanaTokensIsLoading && (
            <>
              {isOnSolana ? (
                <>
                  {sortedSolanaTokens?.map((o, index) => (
                    <Item key={index} token={o} isSolana={true} />
                  ))}
                  {sortedEvmTokens?.map((o, index) => (
                    <Item key={index} token={o} />
                  ))}
                </>
              ) : (
                <>
                  {sortedEvmTokens?.map((o, index) => (
                    <Item key={index} token={o} />
                  ))}
                  {sortedSolanaTokens?.map((o, index) => (
                    <Item key={index} token={o} isSolana={true} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Item({ token, isSolana }: { token: any; isSolana?: boolean }) {
  const getChainLogo = (t: Token) => {
    if (isSolana) {
      return 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png';
    }
    return chainLogoByChainId(t.chainId);
  };
  return (
    <div
      className='w-full space-y-6 rounded-lg bg-zinc-900 p-6 md:flex md:items-center md:space-y-0 md:p-0'
      key={token.symbol}
    >
      <div className='relative min-w-0 md:h-full md:w-6/12 md:p-3 lg:p-6'>
        <div className='absolute inset-y-0 -left-6 w-1.5 -translate-x-1/2 rounded-full bg-[#55FF79] md:inset-y-2.5 md:left-0'></div>
        <div className='flex items-center space-x-6 md:space-x-3'>
          <div className='relative'>
            <img
              src={token.logo}
              alt=''
              className='h-20 w-20 shrink-0 rounded-full md:h-12 md:w-12'
            />
            <img
              src={getChainLogo(token)!}
              alt=''
              className='absolute -bottom-1 -right-1 h-5 w-5 shrink-0 rounded-full'
            />
          </div>
          <div>
            <div className='text-2xl font-semibold text-neutral-300 md:text-lg xl:text-xl'>
              {token.name}
            </div>
            <div className='text-lg text-neutral-400 md:text-sm xl:text-base'>{token.symbol}</div>
          </div>
        </div>
      </div>
      <div className='min-w-0 text-xl font-medium text-neutral-300 md:h-full md:w-3/12 md:p-3 md:text-base lg:p-6 xl:text-lg'>
        {fixedNumberFormat(token.formatted || '0', 3)}
      </div>
      <div className='min-w-0 text-xl font-medium text-neutral-300 md:h-full md:w-3/12 md:p-3 md:text-base lg:p-6 xl:text-lg'>
        {token.requiredBalance}
      </div>
      <div className='min-w-0 text-xl font-medium text-neutral-300 md:h-full md:w-3/12 md:p-3 md:text-base lg:p-6 xl:text-lg'>
        <span className='mr-3 text-neutral-400 md:hidden'>Price:</span>
        {token.pass && <IoMdCheckmarkCircleOutline className='h-6 w-6 text-green-600' />}
        {!token.pass && <IoMdCloseCircleOutline className='h-6 w-6 text-red-600' />}
      </div>
      <div className='md:h-full md:p-6'>
        <a
          href={token.buyLink}
          target='_blank'
          className='inline-flex h-12 w-full min-w-[126px] items-center justify-center rounded-full border border-neutral-300 px-3 align-middle text-neutral-300 transition-colors hover:bg-white/10 sm:w-auto lg:px-6'
        >
          BUY
        </a>
      </div>
    </div>
  );
}
