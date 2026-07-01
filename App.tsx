
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import MainPortfolio from './components/MainPortfolio';
import ArtisticGallery from './components/ArtisticGallery';

import SEO from './components/SEO';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'portfolio' | 'artistic'>('portfolio');

  return (
    <>
      <SEO />
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onFinished={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <AnimatePresence mode="wait">
          {view === 'portfolio' && (
            <MainPortfolio key="portfolio" onOpenGallery={() => setView('artistic')} />
          )}
          {view === 'artistic' && (
            <ArtisticGallery key="artistic" onBack={() => setView('portfolio')} />
          )}
        </AnimatePresence>
      )}
    </>
  );
}

export default App;
