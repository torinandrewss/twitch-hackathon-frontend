import React from 'react';
import HorizontalHeader from '../atomic/HorizontalHeader';
import ClickableText from '../atomic/ClickableText';

const LandingPageHeader = ({ variant = 'light' }) => {
  return (
    <HorizontalHeader>
      <ClickableText text="Home" variant={variant} href={'#home'} />
      <ClickableText text="About" variant={variant} href={'#about'} />
    </HorizontalHeader>
  );
};
export default LandingPageHeader;
