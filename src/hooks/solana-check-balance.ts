import { useDynamicContext } from '@dynamic-labs/sdk-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { BigNumber, FixedNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
import { useEffect, useState } from 'react';

interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  requiredBalance: string;
  logo: string;
  buyLink: string;
  pass?: boolean;
}

const TokenListConfig: Token[] = [
  {
    address: 'native',
    name: 'Solana',
    symbol: 'SOL',
    decimals: 9,
    requiredBalance: '1',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
    buyLink: 'https://www.binance.com/en/trade/SOL_USDT',
  },
  {
    address: '7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx',
    name: 'STEPN',
    symbol: 'GMT',
    decimals: 9,
    requiredBalance: '468',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18069.png',
    buyLink: 'https://www.binance.com/en/trade/GMT_USDT',
  },
  {
    address: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt',
    name: 'Serum',
    symbol: 'SRM',
    decimals: 6,
    requiredBalance: '1102',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6187.png',
    buyLink: 'https://www.binance.com/en/trade/SRM_BUSD',
  },
  {
    address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    name: 'Raydium',
    symbol: 'RAY',
    decimals: 6,
    requiredBalance: '632',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/8526.png',
    buyLink: 'https://www.binance.com/en/trade/RAY_USDT',
  },
  {
    address: '7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx',
    name: 'Coin98',
    symbol: 'C98',
    decimals: 6,
    requiredBalance: '632',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/10903.png',
    buyLink: 'https://www.binance.com/en/trade/C98_USDT',
  },
  {
    address: 'EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp',
    name: 'Bonfida',
    symbol: 'FIDA',
    decimals: 6,
    requiredBalance: '449',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7978.png',
    buyLink: 'https://www.binance.com/en/trade/FIDA_USDT',
  },
];

export function useSolanaCheckBalance() {
  const [tokenBalanceList, setTokenBalanceList] = useState<Token[]>(TokenListConfig);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { primaryWallet } = useDynamicContext();
  const loadTokenBalance = async () => {
    if (!primaryWallet) return;

    setIsLoading(true);
    try {
      const owner = new PublicKey(primaryWallet.address);
      const connection = (await primaryWallet.connector.getWeb3Provider()) as Connection;

      const balanceList = [];

      const solTokenConfig = TokenListConfig.find((o) => o.address === 'native');
      if (solTokenConfig) {
        const formatted = await primaryWallet.connector.getBalance();
        const value = parseUnits(formatted || '0', solTokenConfig.decimals);
        const pass = value
          ? BigNumber.from(value).gte(
              parseUnits(solTokenConfig.requiredBalance, solTokenConfig.decimals)
            )
          : false;
        balanceList.push({ ...solTokenConfig, value, formatted, pass });
      }

      const tokenList = TokenListConfig.filter((o) => o.address !== 'native');

      for (let i = 0; i < tokenList.length; i++) {
        const token = tokenList[i];
        const result = await connection.getTokenAccountsByOwner(owner, {
          mint: new PublicKey(token.address),
        });
        const accounts = result.value;
        let balanceFormatted = FixedNumber.from(0);
        let value = BigNumber.from(0);

        for (let i2 = 0; i2 < accounts.length; i2++) {
          const b = await connection.getTokenAccountBalance(accounts[i2].pubkey);
          balanceFormatted = balanceFormatted.addUnsafe(
            FixedNumber.from(b.value.uiAmountString || b.value.uiAmount)
          );
          value = value.add(BigNumber.from(b.value.amount));
        }
        const pass = value ? value.gte(parseUnits(token.requiredBalance, token.decimals)) : false;
        balanceList.push({
          ...token,
          value,
          formatted: balanceFormatted.toString(),
          pass,
        });
      }
      setTokenBalanceList(balanceList);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const refresh = () => {
    loadTokenBalance();
  };
  useEffect(() => {
    if (primaryWallet && primaryWallet.chain === 'solana') {
      loadTokenBalance();
    } else {
      setTokenBalanceList(TokenListConfig);
    }
  }, [primaryWallet]);
  return { data: tokenBalanceList, isLoading, refresh };
}
