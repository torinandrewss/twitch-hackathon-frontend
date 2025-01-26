import React from 'react';
import styled from 'styled-components';

/**
 * A customizable link component styled like a button.
 *
 * @param {Object} props - Props for the link.
 * @param {string} props.text - The text to display on the link.
 * @returns {JSX.Element} The styled link component.
 */

const BarCell = ({ variant = 'light', href = '', width = 10 }) => {
  return variant !== 'light' && href ? (
    <StyledDiv variant={variant} href={href} width={`${width}px`}></StyledDiv>
  ) : (
    <StyledDiv variant={variant} href="" width={`${width}px`}></StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ width }) => width};
  aspect-ratio: 1;
  font-weight: bold;
  text-decoration: none;
  background-color: ${({ theme, variant }) =>
    variant === 'light' ? theme.colors.white : theme.colors.fourth};
  cursor: ${({ variant }) => (variant === 'dark' ? 'pointer' : 'default')};
  transition:
    transform 0.3s ease-in-out,
    background-color 0.3s ease-in-out;

  &:hover {
    transform: ${({ variant }) =>
      variant === 'light' ? 'scale(1.0)' : 'scale(1.2)'}; /* Expand on hover */
    background-color: ${({ theme, variant }) =>
      variant === 'light' ? theme.colors.white : theme.colors.secondary};
  }
`;

export default BarCell;
