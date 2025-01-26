import React from 'react';
import LandingPageHeader from '../../molecule/LandingPageHeader';
import { BackgroundContainer } from '../../molecule/BackgroundContainer.style';
import HomeSection from './HomeSection';
import styled from 'styled-components';

const LoadingLink = () => (
  <div id="loading">
    <HomeSection />
  </div>
);
// Ladning Page Screen Component
const MainPage = () => {
  return (
    <BackgroundContainer>
      <SectionsContainer>
        <LandingPageHeader />
        <LoadingLink />
      </SectionsContainer>
    </BackgroundContainer>
  );
};

export default MainPage;

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 4rem;
  padding-left: 5rem;
  padding-right: 5rem;
  width: 100vw;
`;
