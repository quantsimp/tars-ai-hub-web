import Header from '@/components/header';
import { useAccount } from 'wagmi';
import { useEvmCheckBalance } from '@/hooks/evm-check-balance';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react';
import { useSolanaCheckBalance } from '@/hooks/solana-check-balance';

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  const { address } = useAccount();
  const { primaryWallet } = useDynamicContext();

  const { data: evmTokens, isLoading: evmTokensIsLoading } = useEvmCheckBalance();

  const { data: solanaTokens, isLoading: solanaTokensIsLoading } = useSolanaCheckBalance();

  const isEligible = () => {
    if (evmTokens && evmTokens.filter((o) => o.pass).length > 0) return true;
    if (solanaTokens && solanaTokens.filter((o) => o.pass).length > 0) return true;
    return false;
  };

  const render = () => {
    if (!address && !primaryWallet) {
      return <main className='mt-10 flex justify-center'>Please connect the wallet.</main>;
    }
    if (evmTokensIsLoading || solanaTokensIsLoading)
      return <main className='mt-10 flex justify-center'>loading...</main>;
    if (isEligible()) {
      return <main className='flex flex-1 flex-col'>{children}</main>;
    } else {
      return (
        <main className='mt-10 flex flex-col items-center justify-center'>
          <p className='text-xl font-bold'>Insufficient Wallet Balance</p>
          <p className='my-4 w-[50%] text-center'>
            Your wallet balance is currently insufficient to access the selected AI model. Please
            visit the Dashboard for more information on how to acquire the required crypto assets
            and gain access.
          </p>
          <Link
            href='/balance'
            className='flex h-12 items-center justify-center rounded-lg bg-primary px-6 font-medium text-black'
          >
            Go to Dashboard
          </Link>
        </main>
      );
    }
  };

  // TODO: use render() instead of children
  return (
    <div className='flex min-h-screen flex-col bg-[#080E0B] font-sans text-white antialiased'>
      <Header />
      {children}
    </div>
  );
}
