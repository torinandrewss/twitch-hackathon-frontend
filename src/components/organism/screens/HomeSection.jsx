import React from 'react';
import styled from 'styled-components';
import LandingTitle from '../../molecule/LandingTitle';
import VodForm from '../../molecule/VodForm';
import DownloadChatLog from '../../molecule/DownloadChatLog';

// Landing Page Screen Component
const HomeSection = () => {
  return (
    <CenterContainer>
      <LandingTitle />
      <DownloadChatLog></DownloadChatLog>
    </CenterContainer>
  );
};

export default HomeSection;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 100vh;
  position: relative;
`;
