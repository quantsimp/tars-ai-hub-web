import { EvmCheckBalanceContainer, SolanaCheckBalanceContainer } from '@/containers';
import { IoMdCloseCircleOutline, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts';

const COLORS = ['#FEDF00', '#DF5E00'];

const data = [
  {
    name: 'Group 1',
    value: 100,
  },
  {
    name: 'goup 2',
    value: 0,
  },
];

function CustomLabel({ isEligible, loading }: { isEligible: boolean; loading: boolean }) {
  return (
    <foreignObject width='232' height='232'>
      <div className='flex h-full w-full flex-col items-center justify-center text-center'>
        {loading ? (
          <>
            <div className='animate-pulse  text-center font-bold leading-none text-white'>
              Loading...
            </div>
          </>
        ) : (
          <>
            {isEligible && <IoMdCheckmarkCircleOutline className='h-24 w-24 text-green-600' />}
            {!isEligible && <IoMdCloseCircleOutline className='h-24 w-24 text-red-600' />}
          </>
        )}
      </div>
    </foreignObject>
  );
}

export default function Balances() {
  const {
    data: evmTokens,
    isLoading: evmTokensIsLoading,
    refresh: evmTokensRefresh,
  } = EvmCheckBalanceContainer.useContainer();

  const {
    data: solanaTokens,
    isLoading: solanaTokensIsLoading,
    refresh: solanaTokensRefresh,
  } = SolanaCheckBalanceContainer.useContainer();

  const isEligible = () => {
    if (evmTokens && evmTokens.filter((o) => o.pass).length > 0) return true;
    if (solanaTokens && solanaTokens.filter((o) => o.pass).length > 0) return true;
    return false;
  };

  const refresh = () => {
    evmTokensRefresh();
    solanaTokensRefresh();
  };
  return (
    <div className='w-full md:w-80'>
      <div className='text-2xl font-semibold'>Access Status</div>
      <div className='mt-7 rounded-2xl border border-zinc-800 bg-zinc-900 p-6'>
        <ResponsiveContainer width={232} height={232} className='mx-auto'>
          <PieChart>
            <Pie
              data={data}
              innerRadius={80}
              outerRadius={116}
              fill='#8884d8'
              paddingAngle={0}
              dataKey='value'
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
              ))}
              <Label
                position='center'
                content={
                  <CustomLabel
                    isEligible={isEligible()}
                    loading={evmTokensIsLoading || solanaTokensIsLoading}
                  />
                }
              ></Label>
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className='mt-6'>
          <button
            onClick={refresh}
            className='flex h-12 w-full items-center justify-center rounded-lg bg-primary font-medium text-black'
          >
            Access Check
          </button>
        </div>
        <div className='mt-6'>
          Obtain AI Hub access by holding the required assets in your wallet. Verify your
          eligibility by clicking “Access Check”
        </div>
      </div>
    </div>
  );
}
