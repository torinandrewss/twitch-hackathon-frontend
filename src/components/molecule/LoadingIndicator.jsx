import React from 'react';
import styled from 'styled-components';
import Spinner from '../atomic/Spinner';

const LoadingIndicator = ({ message = 'Loading...', ...props }) => {
  return (
    <StyledLoadingBlock>
      <Spinner {...props} />
      {message && <StyledMessage>{message}</StyledMessage>}
    </StyledLoadingBlock>
  );
};

export default LoadingIndicator;

const StyledLoadingBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary || '#1e1e1e'};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 90%;
`;

const StyledMessage = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.white || '#ffffff'};
  font-family: ${({ theme }) => theme.fonts.primary || 'Arial, sans-serif'};
  font-size: 1.2rem;
  text-align: center;
`;
