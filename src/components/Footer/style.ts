import styled from 'styled-components';

export const StyledFooter = styled.footer`
  padding: 10px 15px;
  margin-top: auto;
  height: 60px;
  display: flex;
  align-items: center;
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
  }

  @media screen and (max-width: 585px) {
    ul {
      justify-content: center;
    }
    .hide {
      display: none;
    }
  }
`;
