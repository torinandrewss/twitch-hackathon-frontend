import React from 'react';
import styled from 'styled-components';

/**
 * A customizable link component styled like a button.
 *
 * @param {Object} props - Props for the link.
 * @param {string} props.text - The text to display on the link.
 * @returns {JSX.Element} The styled link component.
 */
const ClickableText = ({ text, variant = 'light', href = '#', ...props }) => {
  return (
    <StyledLink variant={variant} href={href} {...props}>
      {text}
    </StyledLink>
  );
};

const StyledLink = styled.a`
  max-height: 50px;
  font-size: clamp(
    0.75rem,
    1.5vw,
    1rem
  ); /* Scales font size between 1rem and 2rem */
  font-weight: bold;
  text-decoration: none;
  background-color: transparent;
  color: ${({ theme, variant }) =>
    variant === 'light' ? theme.colors.white : theme.colors.fourth};
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default ClickableText;
