const items = [
  {
    title: 'Connected with Web3 Wallet',
    description: (
      <>
        Begin by connecting your Web3 wallet to <br />
        access TARS AI Hub
      </>
    ),
  },
  {
    title: 'Choose Your Desired AI Model',
    description: (
      <>
        Browse through AI Models Library and click <br />
        "Launch" on the one you'd like to use
      </>
    ),
  },
  {
    title: 'Wallet Balance Checked',
    description:
      'The system automatically checks if your wallet meets the crypto holding requirement',
  },
  {
    title: 'Access Granted: Use AI Seamlessly',
    description:
      'If balance insufficient, access denied. Buy&hold required crypto, and retry step 2',
  },
];

export default function GettingStarted() {
  return (
    <div className='container'>
      <div className='text-2xl font-semibold'>Getting Started</div>
      <div className='mt-7 rounded-2xl border border-zinc-800 bg-zinc-900 p-10'>
        <div className='grid lg:grid-cols-4'>
          {items.map((item, i) => (
            <div className='flex lg:block' key={item.title}>
              <div className='flex flex-col items-center justify-center lg:flex-row lg:justify-start'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-medium text-black'>
                  {(++i).toString().padStart(2, '0')}
                </div>
                <div className='flex-1 border-l-2 border-dashed border-white/75 lg:border-l-0 lg:border-b-2'></div>
              </div>
              <div className='pl-2 pb-9 lg:pb-0 lg:pr-0 lg:pl-0'>
                <div className='mt-2 font-semibold text-primary lg:mt-6'>{item.title}</div>
                <p className='mt-3 text-sm leading-relaxed text-[#73AA83] lg:text-xs'>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
