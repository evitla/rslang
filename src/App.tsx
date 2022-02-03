import React from 'react';
import { Route, Routes } from 'react-router';
import { ThemeProvider } from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
import { Audiocall, Book, Games, Home, Sprint, User } from './pages';

import GlobalStyles from './styles/global';
import { baseTheme } from './styles/theme';

const App = () => (
  <ThemeProvider theme={baseTheme}>
    <Header />
    <hr />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="book" element={<Book />} />
      <Route path="user" element={<User />} />
      <Route path="games" element={<Games />}>
        <Route path="audiocall" element={<Audiocall />} />
        <Route path="sprint" element={<Sprint />} />
      </Route>
    </Routes>
    <hr />
    <Footer />
    <GlobalStyles />
  </ThemeProvider>
);

export default App;
