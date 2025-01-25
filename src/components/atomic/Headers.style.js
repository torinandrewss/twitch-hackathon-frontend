import styled from 'styled-components';

export const Header = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 1.2;
  /* text-transform: uppercase; */
  margin-bottom: 0rem;
  opacity: 60%;
`;

export const SubHeader = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 2.75rem;
  font-weight: bold;
  line-height: 1.5;
  margin: 0;
`;
