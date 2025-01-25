import React from 'react';
import styled from 'styled-components';

// Header component with left, center (children), and right elements
const HorizontalHeader = ({
  leftElement,
  children,
  rightElement,
  ...props
}) => {
  return (
    <HeaderDiv {...props}>
      <LeftContent>{leftElement}</LeftContent>
      <CenterContent>{children}</CenterContent>
      <RightContent>{rightElement}</RightContent>
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent black background */
  backdrop-filter: blur(10px); /* Apply blur to the background content */
  -webkit-backdrop-filter: blur(10px); /* Safari support */
  z-index: 1000; /* Ensures the header appears above other components */
  border-radius: 50px;
  height: 4rem;
  width: 40%;
  min-width: 300px;
`;

const LeftContent = styled.div`
  display: flex;
  gap: 30px;
  margin-left: 2rem;
  margin-top: 1rem;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CenterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1; /* Allows the center content to grow and fill available space */
  gap: 30px;
`;

const RightContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
  margin-right: 2rem;
  margin-top: 1rem;
`;

export default HorizontalHeader;
