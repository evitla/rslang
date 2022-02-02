import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/global';
import { baseTheme } from './styles/theme';

const App = () => (
  <ThemeProvider theme={baseTheme}>
    <h1>RS Lang</h1>
    <GlobalStyles />
  </ThemeProvider>
);

export default App;
