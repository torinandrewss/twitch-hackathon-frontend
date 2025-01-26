import React from 'react';
import styled from 'styled-components';
import LandingTitle from '../../molecule/LandingTitle';
import VodForm from '../../molecule/VodForm';
import useHomeSection from '../../../hooks/useHomeSection';
import LoadingIndicator from '../../molecule/LoadingIndicator';
import { extractVideoIdFromUrl } from '../../../utils/downloadChatLog';
import ChatBarChart from '../ChatBarChart';

// Landing Page Screen Component
const HomeSection = () => {
  const { downloadChatLog, loading, parsedJson, setUrl } = useHomeSection();

  const onSubmit = (url) => {
    setUrl(url);
    const videoId = extractVideoIdFromUrl(url);
    downloadChatLog(videoId);
  };

  return (
    <CenterContainer>
      <LandingTitle />

      {/* Conditional Rendering Logic */}
      {loading ? (
        <LoadingIndicator />
      ) : parsedJson ? (
        <ChatBarChart chatData={parsedJson} />
      ) : (
        <VodForm onSubmit={onSubmit} />
      )}
    </CenterContainer>
  );
};

export default HomeSection;

// Styled Components
const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 100vh;
  position: relative;
  padding-bottom: 3rem;
`;
