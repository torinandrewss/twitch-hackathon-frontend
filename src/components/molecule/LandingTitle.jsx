import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HorizontalHeader from '../atomic/HorizontalHeader';
import { TwitchLogo } from '../atomic/TwitchLogo';
import twitchImg from '../../assets/raindrop.png'
// import { Header, SubHeader as StyledSubHeader } from '../atomic/Headers.style';

// Title content component for the landing page
const LandingTitle = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Know your best moments';

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
        <TwitchLogo src={twitchImg} alt="Twitch Logo" />
        <Header>Twitch Wrapped</Header>
        <SubHeader>{displayedText}</SubHeader>
        <ContentText>Your Twitch stream analytics done right</ContentText>
      </TitleContainer>
    </TitleCenterContainer>
  );
};

export default LandingTitle;

const TitleCenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const Header = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 4rem;
  font-weight: bold;
  line-height: 1.2;
  /* text-transform: uppercase; */
  margin-bottom: 2.6rem;
  opacity: 80%;
`;

const SubHeader = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 2.2rem;
  font-weight: bold;
  line-height: 1.5;
  margin: 0;
`;


// const SubHeader = styled(StyledSubHeader)`
//   font-weight: bold;
//   font-family: ${({ theme }) => theme.fonts.primary};
//   font-size: 2rem;
//   text-align: center;
// `;

const ContentText = styled.h4`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1.3rem;
`;
