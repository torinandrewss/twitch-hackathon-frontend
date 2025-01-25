import React from 'react';
import styled from 'styled-components';

const DateDisplay = ({ date }) => {
  return <Contianer>{date}</Contianer>;
};

export default DateDisplay;

const Contianer = styled.div`
  display: inline-block;
  border-radius: 25px;
  opacity: 60%;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  border: 1px solid;
  padding: 0.5rem;
`;
