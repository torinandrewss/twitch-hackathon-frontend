import React from 'react';
import styled from 'styled-components';

/**
 * A customizable link component styled like a button.
 *
 * @param {Object} props - Props for the link.
 * @param {string} props.text - The text to display on the link.
 * @returns {JSX.Element} The styled link component.
 */
const BarCell = ({ variant = 'light', href = '', ...props }) => {
  return <StyledDiv variant={variant} href={href} {...props}></StyledDiv>;
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px; /* Explicit width */
  height: 100px; /* Explicit height */
  aspect-ratio: 1; /* Ensures square shape if dimensions change */
  font-weight: bold;
  text-decoration: none;
  background-color: ${({ theme, variant }) =>
    variant === 'light' ? theme.colors.white : theme.colors.fourth};
  cursor: ${({ variant }) => (variant === 'dark' ? 'pointer' : 'default')};
  transition:
    transform 0.3s ease-in-out,
    background-color 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1); /* Expand on hover */
    background-color: ${({ theme, variant }) =>
      variant === 'light' ? theme.colors.white : theme.colors.secondary};
  }
`;

export default BarCell;
