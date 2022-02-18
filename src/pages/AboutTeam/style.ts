import styled from 'styled-components';

export const AboutTeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;

  h2 {
    color: white;
    opacity: 0;
    transition: all 1s;
  }

  .card {
    height: 379px;
    width: 300px;
    background: grey;
    border-radius: 10px;
    transition: background 0.8s;
    overflow: hidden;
    background: black;
    box-shadow: 0 70px 63px -60px #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .card-evitla {
    background: url('https://i.pinimg.com/736x/8f/a0/51/8fa051251f5ac2d0b756027089fbffde--terry-o-neill-al-pacino.jpg')
      center center no-repeat;
    background-size: 300px;

    &:hover {
      background: url('https://i.pinimg.com/736x/8f/a0/51/8fa051251f5ac2d0b756027089fbffde--terry-o-neill-al-pacino.jpg')
        left center no-repeat;
      background-size: 600px;

      h2 {
        opacity: 1;
      }
    }
  }

  .card-excluz1v {
    background: url('https://i.pinimg.com/originals/28/d2/e6/28d2e684e7859a0dd17fbd0cea00f8a9.jpg')
      center center no-repeat;
    background-size: 300px;

    &:hover {
      background: url('https://i.pinimg.com/originals/28/d2/e6/28d2e684e7859a0dd17fbd0cea00f8a9.jpg')
        left center no-repeat;
      background-size: 600px;

      h2 {
        opacity: 1;
      }
    }
  }

  .card-hxnxikazuchi {
    background: url('https://i.pinimg.com/originals/ee/85/08/ee850842e68cfcf6e3943c048f45c6d1.jpg')
      center center no-repeat;
    background-size: 300px;

    &:hover {
      background: url('https://i.pinimg.com/originals/ee/85/08/ee850842e68cfcf6e3943c048f45c6d1.jpg')
        left center no-repeat;
      background-size: 600px;

      h2 {
        opacity: 1;
      }
    }
  }
`;
