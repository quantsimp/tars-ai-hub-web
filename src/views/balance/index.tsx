import GettingStarted from '@/components/getting-started';
import BalanceList from '@/views/balance/balance-list';
import Balances from '@/views/balance/balances';

export default function ViewBalance() {
  return (
    <div>
      <div className='border-b border-primary py-9'>
        <div className='container'>
          <div className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            Unlock AI with your crypto
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='my-12 space-y-6 lg:flex lg:space-y-0 lg:space-x-12'>
          <Balances />
          <BalanceList />
        </div>
        <div className='my-12'>
          <GettingStarted />
        </div>
      </div>
    </div>
  );
}
