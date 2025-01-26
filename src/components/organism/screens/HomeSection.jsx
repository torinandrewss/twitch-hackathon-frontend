import React from 'react';
import styled from 'styled-components';
import LandingTitle from '../../molecule/LandingTitle';
import VodForm from '../../molecule/VodForm';
import useHomeSection from '../../../hooks/useHomeSection';
import LoadingIndicator from '../../molecule/LoadingIndicator';
import { extractVideoIdFromUrl } from '../../../utils/downloadChatLog';
import ChatBarChart from '../ChatBarChart';
import BarBar from '../../molecule/BarBar';

// Landing Page Screen Component
const HomeSection = () => {
  const { downloadChatLog, loading, parsedJson, unparsedJson, setUrl } = useHomeSection();

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
        <>
          <ChatBarChart chatData={parsedJson} />
          <BarBar data={unparsedJson} />
        </>
      ) : (
        <VodForm onSubmit={onSubmit} />
      )}
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
  min-width: 600px;
  height: 100vh;
  position: relative;
  padding-bottom: 3rem;
`;
