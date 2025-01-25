import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Header, SubHeader as StyledSubHeader } from '../atomic/Headers.style';

// Title content component for the landing page
const LandingTitle = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Welcome to Page';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100); // Adjust typing speed (milliseconds per character)

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  return (
    <TitleCenterContainer>
      <TitleContainer>
        <Header>Twitch Hackathon</Header>
        <SubHeader>{displayedText}</SubHeader>
        <ContentText>
          Content Here
        </ContentText>
      </TitleContainer>
    </TitleCenterContainer>
  );
};

const TitleCenterContainer = styled.div`
  margin-top: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  max-width: 700px;
`;

const SubHeader = styled(StyledSubHeader)`
  font-weight: bold;
`;

const ContentText = styled.h4`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  margin: 0;
  text-align: center;
`;

export default LandingTitle;
