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
    background-color: ${({ theme }) =>
      theme.name === 'light' ? '#edc9a5' : '#895a2c'};
    border-radius: 10px;
    overflow: hidden;
    box-shadow: ${({ theme }) =>
        theme.name === 'light' ? 'rgb(0 0 0 / 15%)' : 'rgb(255 255 255 / 15%)'}
      0px 0px 10px;
    transition: background 0.8s;
  }

  .description {
    color: #000000;
    padding: 10px;
  }

  .card {
    width: 100%;
    max-width: 230px;
    min-width: 150px;
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

  @media screen and (max-width: 480px) {
    font-size: 14px;
    gap: 15px;

    .card {
      height: 200px;
    }

    .wrapper-evitla {
      &:hover .card-evitla {
        background: url(${avatar1}) left center no-repeat;
        background-size: 250px;

        .github-svg {
          opacity: 1;
        }
      }
    }

    .wrapper-excluz1v {
      &:hover .card-excluz1v {
        background: url(${avatar2}) left center no-repeat;
        background-size: 250px;

        .github-svg {
          opacity: 1;
        }
      }
    }

    .wrapper-hxnxikazuchi {
      &:hover .card-hxnxikazuchi {
        background: url(${avatar3}) left center no-repeat;
        background-size: 250px;

        .github-svg {
          opacity: 1;
        }
      }
    }
  }
`;

export const Advantages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 100px;
  height: 100%;
  min-height: 100vh;

  h2 {
    font-size: 4rem;
    font-weight: 800;
    text-align: right;
  }

  .advantages-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }

  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 400px;
    max-height: 400px;
    min-height: 200px;
    padding: 10px 15px;
    text-align: center;
    background-color: ${({ theme }) =>
      theme.name === 'light' ? '#edc9a5' : '#895a2c'};
    border-radius: 20px;
    gap: 20px;
    box-shadow: ${({ theme }) =>
        theme.name === 'light' ? 'rgb(0 0 0 / 15%)' : 'rgb(255 255 255 / 15%)'}
      0px 0px 10px;
  }

  h3 {
    width: 100%;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
  }
`;
