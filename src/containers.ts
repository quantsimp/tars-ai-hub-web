import { useEvmCheckBalance } from '@/hooks/evm-check-balance';
import { useHomeData } from '@/hooks/home-data';
import { useSolanaCheckBalance } from '@/hooks/solana-check-balance';
import { createContainer } from 'unstated-next';

export const EvmCheckBalanceContainer = createContainer(useEvmCheckBalance);
export const SolanaCheckBalanceContainer = createContainer(useSolanaCheckBalance);

export const HomeDataContainer = createContainer(useHomeData);
