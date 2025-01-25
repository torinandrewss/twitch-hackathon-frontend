import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ icon, text = '', onClick, ...props }) => {
  return (
    <ClickableWrapper onClick={onClick}>
      <FontAwesomeIcon icon={icon} size={'3x'} {...props} />
      <IconText> {text} </IconText>
    </ClickableWrapper>
  );
};

export default Icon;

const ClickableWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  column-gap: 1rem;

  &:hover {
    opacity: 0.7;
    color: ${({ theme }) => theme.colors.white};
  }
`;

const IconText = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  max-height: 50px;
  font-size: 16px;
  border: none;
`;
