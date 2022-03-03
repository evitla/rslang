import React from 'react';
import { useLocation } from 'react-router';

import { StyledFooter } from './style';
import { Wrapper } from '../../styles/wrapper';
import rssSVG from '../../assets/images/rss.png';

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
                      evitla
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/hxnxikazuchi"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      hxnxikazuchi
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/excluz1v"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      excluz1v
                    </a>
                  </li>
                </ul>
              </li>
              <li className="hide">2022</li>
              <li className="hide rsschool">
                <a
                  href="https://rs.school/js/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="logo" src={rssSVG} alt="" />
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
