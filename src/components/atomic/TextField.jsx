import React from 'react';
import styled from 'styled-components';

// Text field component to be used with react hook form state
const TextField = ({ label, name, register, errors, validation, ...props }) => {
  return (
    <FieldWrapper>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        {...register(name, validation)}
        {...props}
        hasError={errors?.[name]}
      />
      {errors?.[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
    </FieldWrapper>
  );
};

export default TextField;

const FieldWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const Input = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== 'hasError',
})`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid
    ${({ hasError, theme }) => (hasError ? 'red' : theme.colors.white)};
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: ${({ hasError, theme }) =>
      hasError ? 'red' : theme.colors.secondary};
    box-shadow: ${({ hasError }) =>
      hasError
        ? '0 0 5px rgba(255, 0, 0, 0.5)'
        : '0 0 5px rgba(0, 123, 255, 0.5)'};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;
