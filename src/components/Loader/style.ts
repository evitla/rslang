import styled from 'styled-components';

export const StyledLoading = styled.div`
  width: 200px;
  height: 60px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .circle {
    width: 20px;
    height: 20px;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    left: 15%;
    transform-origin: 50%;
    animation: circle 0.5s alternate infinite ease;

    &:nth-child(2) {
      left: 45%;
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      left: auto;
      right: 15%;
      animation-delay: 0.3s;
    }
  }

  @keyframes circle {
    0% {
      top: 60px;
      height: 5px;
      border-radius: 50px 50px 25px 25px;
      transform: scaleX(1.7);
    }
    40% {
      height: 20px;
      border-radius: 50%;
      transform: scaleX(1);
    }
    100% {
      top: 0%;
    }
  }
`;
