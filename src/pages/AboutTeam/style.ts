import styled from 'styled-components';
import avatar1 from '../../assets/images/avatar1.png';

export const AboutTeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
  padding: 10px;

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
    background: url('https://i.pinimg.com/originals/28/d2/e6/28d2e684e7859a0dd17fbd0cea00f8a9.jpg')
      center center no-repeat;
    background-size: 250px;
  }

  .card-hxnxikazuchi {
    background: url('https://i.pinimg.com/originals/ee/85/08/ee850842e68cfcf6e3943c048f45c6d1.jpg')
      center center no-repeat;
    background-size: 250px;
  }

  .wrapper-evitla {
    &:hover .card-evitla {
      background: url(${avatar1}) left center no-repeat;
      background-size: 350px;

      h2 {
        opacity: 1;
      }

      .github-svg {
        opacity: 1;
      }
    }
  }

  .wrapper-excluz1v {
    &:hover .card-excluz1v {
      background: url('https://i.pinimg.com/originals/28/d2/e6/28d2e684e7859a0dd17fbd0cea00f8a9.jpg')
        left center no-repeat;
      background-size: 350px;

      h2 {
        opacity: 1;
      }
      .github-svg {
        opacity: 1;
      }
    }
  }

  .wrapper-hxnxikazuchi {
    &:hover .card-hxnxikazuchi {
      background: url('https://i.pinimg.com/originals/ee/85/08/ee850842e68cfcf6e3943c048f45c6d1.jpg')
        left center no-repeat;
      background-size: 350px;

      h2 {
        opacity: 1;
      }

      .github-svg {
        opacity: 1;
      }
    }
  }
`;
