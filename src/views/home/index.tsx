import { HomeDataContainer } from '@/containers';
import BrowseAllAiTools from './browse-all-ai-tools';
import Hero from './hero';
import GettingStarted from '@/components/getting-started';

export default function ViewHome() {
  return (
    <div>
      <HomeDataContainer.Provider>
        <Hero />
        <div className='my-16'>
          <GettingStarted />
        </div>
        <div className='my-16' id='models'>
          <BrowseAllAiTools />
        </div>
      </HomeDataContainer.Provider>
    </div>
  );
}
