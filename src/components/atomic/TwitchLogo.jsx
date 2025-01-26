import styled from 'styled-components';

export const TwitchLogo = styled.img`
  max-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  margin-bottom: 2.5rem;


  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    max-width: 100px;
    max-height: 100px;
  }
`;