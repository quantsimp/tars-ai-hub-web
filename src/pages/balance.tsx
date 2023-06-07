import ViewBalance from '@/views/balance';
import DefaultLayout from '@/layouts/default';
import { EvmCheckBalanceContainer, SolanaCheckBalanceContainer } from '@/containers';

export default function PageBalance() {
  return (
    <DefaultLayout>
      <EvmCheckBalanceContainer.Provider>
        <SolanaCheckBalanceContainer.Provider>
          <ViewBalance />
        </SolanaCheckBalanceContainer.Provider>
      </EvmCheckBalanceContainer.Provider>
    </DefaultLayout>
  );
}
