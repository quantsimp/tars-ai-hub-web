import { Inter as FontSans } from '@next/font/google';

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { configureChains, createClient, mainnet } from 'wagmi';
import { arbitrum, bsc, optimism, polygon, zkSync } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { WagmiConfig } from 'wagmi';
import { useIsClient } from 'usehooks-ts';
import { okc } from 'wagmi/chains';
import { avalanche } from 'wagmi/chains';
import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { apiFetcher } from '@/api-axios';
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

//set chain logo
(zkSync as any).iconUrl = '/images/chains/zksync.png';
(okc as any).iconUrl = '/images/chains/okchain.png';

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, bsc, optimism, arbitrum, zkSync, polygon, okc, avalanche],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({ appName: 'TARS Ai Hub', chains });

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors,
});

const queryClient = new QueryClient({ defaultOptions: { queries: { queryFn: apiFetcher } } });

const cssOverrides = `
.dynamic-connect-button {
  background-color: #55ff79;
  padding: 0.75rem 1.5rem;
}
.dynamic-connect-button:hover {
  background-color: #55ff79;
}
.dynamic-connect-button.button--primary:hover:enabled {
  background-color: #3aae52;
}
.dynamic-connect-button .typography {
  color: #000;
  font-size: 1rem;
}
.footer__container--heading .typography {
  color: #000;
}
.footer__container--icon {
  color: #000;
}
.powered-by-dynamic {
  display: none;
}`;

export default function App({ Component, pageProps }: AppProps) {
  const isClient = useIsClient();
  return (
    <>
      {/* Required so we can use the font in the global scope and create a variable in Tailwind */}
      <style jsx global>{`
        :root {
          --font-inter: ${fontSans.style.fontFamily};
        }
      `}</style>

      <DynamicContextProvider
        theme='dark'
        settings={{
          environmentId: 'b808b30e-3bbc-493f-a4e8-88cbc47cd731',
          cssOverrides,
        }}
      >
        <DynamicWagmiConnector>
          <QueryClientProvider client={queryClient}>
            {isClient && <Component {...pageProps} />}
          </QueryClientProvider>
        </DynamicWagmiConnector>
      </DynamicContextProvider>
    </>
  );
}
