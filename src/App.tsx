import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import { ThemeProvider } from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
import { SetIsAuthFormOpenContext } from './hooks/useOpenAuthForm';
import { Audiocall, Book, BookPages, Games, Home, Sprint, User } from './pages';

import GlobalStyles from './styles/global';
import { baseTheme } from './styles/theme';
import { Wrapper } from './styles/wrapper';

const App = () => {
  const [isAuthFormOpen, setIsAuthFormOpen] = useState(false);

  return (
    <ThemeProvider theme={baseTheme}>
      <SetIsAuthFormOpenContext.Provider
        value={{ isAuthFormOpen, setIsAuthFormOpen }}
      >
        <Header />
        <hr />
        <main>
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="book" element={<Book />}>
                <Route path=":groupId/:pageId" element={<BookPages />} />
              </Route>
              <Route path="user" element={<User />} />
              <Route path="games" element={<Games />}>
                <Route path="audiocall" element={<Audiocall />} />
                <Route path="sprint" element={<Sprint />} />
              </Route>
            </Routes>
          </Wrapper>
        </main>
        <hr />
        <Footer />
      </SetIsAuthFormOpenContext.Provider>
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
