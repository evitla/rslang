import React from 'react';
import { useLocation } from 'react-router';

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <>
      {!pathname.includes('games') && (
        <footer>
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
        </footer>
      )}
    </>
  );
};

export default Footer;
