import React from 'react';
import styled from 'styled-components';

// Template component that serves as the basis for all pages
export const PageTemplate = ({ header, hero, footer, children, ...rest }) => {
  return (
    <RootContainer {...rest}>
      {header && <Header>{header}</Header>}
      <MainContent>
        {hero && <HeroSection>{hero}</HeroSection>}
        {children}
      </MainContent>
      {footer && <Footer>{footer}</Footer>}
    </RootContainer>
  );
};

// Styled Components
const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: row;
  }
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  max-height: 100vh;
  z-index: 999;

  @media ${({ theme }) => theme.device.tablet} {
    min-width: 18rem;
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const HeroSection = styled.section`
  /* Additional styling for hero section can go here */
`;

const Footer = styled.footer`
  margin-top: auto;
`;
