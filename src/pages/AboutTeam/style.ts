import styled from 'styled-components';
import avatar1 from '../../assets/images/avatar1.png';
import avatar2 from '../../assets/images/avatar2.png';
import avatar3 from '../../assets/images/avatar3.png';

export const AboutTeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
  padding: 10px;

  a {
    outline: none;
  }

  h2,
  h5 {
    margin-bottom: 5px;
  }

  .github-svg {
    display: block;
    width: 50px;
    height: 50px;
    filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(100deg)
      brightness(115%) contrast(106%);
    opacity: 0;
    transition: all 0.5s linear;

    &:hover {
      transform: scale(0.9);
    }
  }

  .card-wrapper {
    display: flex;
    max-width: 700px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgb(0 0 0 / 15%) 0px 0px 10px;
    transition: background 0.8s;
  }

  .description {
    color: #000000;
    padding: 10px;
  }

  .card {
    width: 100%;
    max-width: 230px;
    height: 250px;
    background: grey;
    transition: background 0.8s;
    overflow: hidden;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .card-evitla {
    background: url(${avatar1}) center center no-repeat;
    background-size: 250px;
  }

  .card-excluz1v {
    background: url(${avatar2}) center center no-repeat;
    background-size: 250px;
  }

  .card-hxnxikazuchi {
    background: url(${avatar3}) center center no-repeat;
    background-size: 250px;
  }

  .wrapper-evitla {
    &:hover .card-evitla {
      background: url(${avatar1}) left center no-repeat;
      background-size: 400px;

      .github-svg {
        opacity: 1;
      }
    }
  }

  .wrapper-excluz1v {
    &:hover .card-excluz1v {
      background: url(${avatar2}) left center no-repeat;
      background-size: 400px;

      .github-svg {
        opacity: 1;
      }
    }
  }

  .wrapper-hxnxikazuchi {
    &:hover .card-hxnxikazuchi {
      background: url(${avatar3}) left center no-repeat;
      background-size: 400px;

      .github-svg {
        opacity: 1;
      }
    }
  }
`;
