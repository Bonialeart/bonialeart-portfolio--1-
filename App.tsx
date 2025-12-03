
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import HomeSelection from './components/HomeSelection';
import MainPortfolio from './components/MainPortfolio';
import ArtisticGallery from './components/ArtisticGallery';

import CustomCursor from './components/CustomCursor';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'selection' | 'portfolio' | 'artistic'>('selection');

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onFinished={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <AnimatePresence mode="wait">
          {view === 'selection' && (
            <HomeSelection key="selection" onSelect={setView} />
          )}
          {view === 'portfolio' && (
            <MainPortfolio key="portfolio" onBack={() => setView('selection')} />
          )}
          {view === 'artistic' && (
            <ArtisticGallery key="artistic" onBack={() => setView('selection')} />
          )}
        </AnimatePresence>
      )}
    </>
  );
}

export default App;
