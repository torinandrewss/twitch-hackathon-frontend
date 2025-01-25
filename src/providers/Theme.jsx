import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/constants';

// Global theme provider for the application
const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
