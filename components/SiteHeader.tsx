// components/SiteHeader.tsx
'use client';

import React, { useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';

/**
 * Aggregates <Header/> + <Navigation/> so they can share open state.
 */
const SiteHeader: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <Header   navOpen={navOpen} setNavOpen={setNavOpen} />
      <Navigation navOpen={navOpen} setNavOpen={setNavOpen} />
    </>
  );
};

export default SiteHeader;
