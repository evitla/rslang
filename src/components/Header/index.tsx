import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import AuthForm from '../AuthForm';
import { StyledHeader, StyledListItem, StyledNav, StyledUList } from './style';
import { StyledButton } from '../../styles/components';
import { FlexWrapper } from '../../styles/wrapper';
import { START_GROUP, START_PAGE } from '../../constants';
import { TStore } from '../../store';
import useOpenAuthForm from '../../hooks/useOpenAuthForm';
import useClickOutside from '../../hooks/useClickOutside';

import userIcon from '../../assets/images/user-icon.svg';

const Header = () => {
  const { user } = useSelector((state: TStore) => state.userReducer);
  const { isAuthFormOpen, setIsAuthFormOpen } = useOpenAuthForm();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  useClickOutside(burgerRef, setIsMenuOpen);

  const { pathname } = useLocation();

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <StyledHeader isMenuOpen={isMenuOpen}>
      <FlexWrapper>
        <Link className="logo" to="/">
          RS Lang Logo
        </Link>
        <div className="navigation">
          <StyledNav isMenuOpen={isMenuOpen}>
            <StyledUList>
              <StyledListItem active={pathname.includes('book')}>
                <Link to={`book/${START_GROUP}/${START_PAGE}`}>
                  Электронный учебник
                </Link>
              </StyledListItem>
              <StyledListItem active={pathname.includes('games')}>
                <Link to="games">Мини-игры</Link>
              </StyledListItem>
            </StyledUList>
          </StyledNav>
          <div className="right-side">
            {user !== null ? (
              <Link to="user" className="user">
                <img src={userIcon} alt="" />
              </Link>
            ) : (
              <StyledButton
                className="gradient-btn"
                onClick={() => setIsAuthFormOpen(!isAuthFormOpen)}
              >
                Зарегистрироваться
              </StyledButton>
            )}
            <StyledButton
              ref={burgerRef}
              className="burger"
              onClick={handleOpenMenu}
            >
              <div className="burger-line line1"></div>
              <div className="burger-line line2"></div>
              <div className="burger-line line3"></div>
            </StyledButton>
          </div>
        </div>
      </FlexWrapper>
      {isAuthFormOpen && <AuthForm setIsOpen={setIsAuthFormOpen} />}
    </StyledHeader>
  );
};

export default Header;
