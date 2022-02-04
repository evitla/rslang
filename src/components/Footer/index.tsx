import React from 'react';
import { useLocation } from 'react-router';

import { StyledFooter } from './style';
import { Wrapper } from '../../styles/wrapper';

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <>
      {!pathname.includes('games') && (
        <StyledFooter>
          <Wrapper>
            <ul>
              <li>
                <ul>
                  <li>
                    <a
                      href="https://github.com/evitla"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Dinmukhamed Sailaubek
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/hxnxikazuchi"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ruslan Kupzhassarov
                    </a>
                  </li>
                </ul>
              </li>
              <li>2022</li>
              <li>
                <a
                  href="https://rs.school/js/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RS School
                </a>
              </li>
            </ul>
          </Wrapper>
        </StyledFooter>
      )}
    </>
  );
};

export default Footer;
