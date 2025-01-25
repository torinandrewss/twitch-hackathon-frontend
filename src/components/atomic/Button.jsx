import React from 'react';
import styled from 'styled-components';

/**
 * A customizable button component.
 *
 * @param {Object} props - Props for the button.
 * @param {string} props.text - The text to display on the button.
 * @param {"fill"|"outline"} [props.variant] - The button style, either `fill` or `outline`. Defaults to `fill`.
 * @param {string} [props.color] - The base color for the button's styling.
 * @returns {JSX.Element} The styled button component.
 */
const Button = ({ text, variant = 'fill', ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  padding: 10px 20px;
  max-height: 50px;
  font-size: 1rem;
  border-radius: 20px;
  font-family: ${({ theme }) => theme.fonts.primary || 'Arial, sans-serif'};
  border: ${({ variant, theme }) =>
    variant === 'outline'
      ? `2px solid ${theme.colors.secondary}`
      : `2px solid ${theme.colors.secondary}`};
  background-color: ${({ variant, theme }) =>
    variant === 'fill' ? theme.colors.secondary : 'transparent'};
  color: ${({ variant, theme }) =>
    variant === 'outline' ? theme.colors.secondary : '#fff'};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ variant, theme }) =>
      variant === 'outline' ? theme.colors.secondary : '#fff'};
    color: ${({ variant }) => (variant === 'outline' ? '#fff' : '#000')};
    border: ${({ color }) => `2px solid ${color}`};
  }
`;

export default Button;
