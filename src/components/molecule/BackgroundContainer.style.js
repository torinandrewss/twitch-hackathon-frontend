import styled from 'styled-components';
import backgroundImage from '../../assets/backsplash.png';

export const BackgroundContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden; /* Prevent horizontal overflow */
  overflow-y: auto; /* Enable vertical scrolling */
  scroll-behavior: smooth;
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
`;
