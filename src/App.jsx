import React from 'react';
import Theme from './providers/Theme';
import MainPage from './components/organism/screens/MainPage';
import { GlobalStyle } from './styles/globalStyle';

const App = () => {
  return (
    <Theme>
      <GlobalStyle />
      <MainPage />
    </Theme>
  );
};

export default App;
