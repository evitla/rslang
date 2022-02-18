import styled from 'styled-components';

export const AboutTeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
  padding: 10px;

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
    background: url('https://i.pinimg.com/736x/8f/a0/51/8fa051251f5ac2d0b756027089fbffde--terry-o-neill-al-pacino.jpg')
      center center no-repeat;
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
      background: url('https://i.pinimg.com/736x/8f/a0/51/8fa051251f5ac2d0b756027089fbffde--terry-o-neill-al-pacino.jpg')
        left center no-repeat;
      background-size: 350px;

      h2 {
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
    }
  }
`;
