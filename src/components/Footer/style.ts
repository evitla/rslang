import styled from 'styled-components';

export const StyledFooter = styled.footer`
  padding: 10px 15px;
  margin-top: auto;
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;

    ul {
      width: 350px;

      li {
        position: relative;

        &::before {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          height: 2px;
          width: 0%;
          background-color: steelblue;
          transition: all 0.3s linear;
        }

        &:hover::before {
          width: 100%;
        }
      }
    }

    .logo {
      filter: invert(100%);
      transition: all 0.2s linear;

      &:hover {
        filter: invert(70%);
      }
    }
  }

  @media screen and (max-width: 610px) {
    ul {
      justify-content: center;
    }
    .hide {
      display: none;
    }
  }
`;
