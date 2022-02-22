import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import { ThemeProvider } from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
import { SetIsAuthFormOpenContext } from './hooks/useOpenAuthForm';
import useThemeToggler from './hooks/useThemeToggler';
import {
  Audiocall,
  AboutTeam,
  Book,
  BookPages,
  ErrorPage,
  Games,
  Home,
  Sprint,
  User,
  Statistic,
  LearnedWords,
} from './pages';

import GlobalStyles from './styles/global';
import { lightTheme, darkTheme } from './styles/theme';
import { Wrapper } from './styles/wrapper';

const App = () => {
  const [isAuthFormOpen, setIsAuthFormOpen] = useState(false);
  const { theme, themeToggler } = useThemeToggler();

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <SetIsAuthFormOpenContext.Provider
        value={{ isAuthFormOpen, setIsAuthFormOpen }}
      >
        <Header theme={theme} themeToggler={themeToggler} />
        <main>
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="book" element={<Book />}>
                <Route path=":groupId/:pageId" element={<BookPages />} />
              </Route>
              <Route path="user" element={<User />}>
                <Route path="stats" element={<Statistic />}/>
                <Route path="learned-words" element={<LearnedWords />}/>
              </Route>
              <Route path="games" element={<Games />}>
                <Route path="audiocall" element={<Audiocall />} />
                <Route path="sprint" element={<Sprint />} />
              </Route>
              <Route path="about-team" element={<AboutTeam />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Wrapper>
        </main>
        <Footer />
      </SetIsAuthFormOpenContext.Provider>
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
