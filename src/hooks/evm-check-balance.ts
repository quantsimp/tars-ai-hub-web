import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils.js';
import { erc20ABI, useAccount, useBalance, useContractReads } from 'wagmi';

export interface Token {
  id: number;
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  requiredBalance: string;
  logo: string;
  buyLink: string;
  pass?: boolean;
}

export function useEvmCheckBalance() {
  const { address } = useAccount();

  const { data: tokenList } = useQuery<Token[]>({ queryKey: ['data/token_check_list'] });

  const contracts = tokenList?.filter((o) => o.address != 'native');
  const {
    data: balanceData,
    isLoading: balanceDataLoading,
    isRefetching: balanceDataRefetching,
    refetch,
  } = useContractReads({
    contracts: contracts?.map((o) => {
      return {
        address: o.address as `0x${string}`,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [address],
        chainId: o.chainId,
      };
    }),
    enabled: !!address && !!contracts && contracts.length > 0,
  });
  //eth
  const {
    data: nb1,
    isLoading: nb1Loading,
    isRefetching: nb1Refetching,
    refetch: nb1Refetch,
  } = useBalance({ address: address, chainId: 1 });
  //bnb
  const {
    data: nb56,
    isLoading: nb56Loading,
    isRefetching: nb56Refetching,
    refetch: nb56Refetch,
  } = useBalance({ address: address, chainId: 56 });
  //polygon
  const {
    data: nb137,
    isLoading: nb137Loading,
    isRefetching: nb137Refetching,
    refetch: nb137Refetch,
  } = useBalance({ address: address, chainId: 137 });

  const refresh = () => {
    if (!address) return;
    refetch();
    nb1Refetch();
    nb56Refetch();
    nb137Refetch();
  };

  const result: Token[] | undefined = tokenList?.map((o) => {
    //eth
    if (o.address === 'native' && o.chainId === 1) {
      const pass = nb1 ? nb1.value.gte(parseUnits(o.requiredBalance, o.decimals)) : false;
      return { ...(nb1 as any), ...o, pass };
    }
    //bnb
    if (o.address === 'native' && o.chainId === 56) {
      const pass = nb56 ? nb56.value.gte(parseUnits(o.requiredBalance, o.decimals)) : false;
      return { ...(nb56 as any), ...o, pass };
    }
    //polygon
    if (o.address === 'native' && o.chainId === 137) {
      const pass = nb137 ? nb137.value.gte(parseUnits(o.requiredBalance, o.decimals)) : false;
      return { ...(nb137 as any), ...o, pass };
    }

    const index = contracts?.findIndex((c) => c.address === o.address && c.chainId === o.chainId);
    const value = balanceData?.[index!] as BigNumber;
    const formatted = value ? formatUnits(value, o.decimals) : '';
    const pass = value ? value.gte(parseUnits(o.requiredBalance, o.decimals)) : false;
    return { ...o, value, formatted, pass };
  });

  const isLoading =
    balanceDataLoading ||
    balanceDataRefetching ||
    nb1Loading ||
    nb1Refetching ||
    nb56Loading ||
    nb56Refetching ||
    nb137Loading ||
    nb137Refetching;

  return { data: result, isLoading, refresh };
}
