import React, { useState } from 'react';
import styled from 'styled-components';

import BarCell from '../atomic/BarCell';

const BarBar = ({ startEndPoints, length = 5}) => {
  return (
    <Container>
      {Array.from({ length }, (_, index) => (
        <BarCell
          key={index}
          variant={'light'} // Logic for dark/light variants
          width={40}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between; /* Spreads cells evenly across the bar */
  align-items: center;
  width: 100%; /* Fills the width of the screen */
  background-color: ${({ theme }) =>
    theme.colors.primary || '#f0f0f0'}; /* Background color for the bar */
`;

export default BarBar;
