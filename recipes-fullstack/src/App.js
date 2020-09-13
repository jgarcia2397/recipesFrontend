import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from './components/UI/Header';
import theme from './components/UI/Theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      Hello!
    </ThemeProvider>
  );
}

export default App;
