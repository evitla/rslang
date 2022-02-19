import styled from 'styled-components';

export const GameWrapper = styled.div`
  padding: 20px;
  height: calc(100vh - 163px);

  .card__image {
    display: block;
    width: 100%;
    height: 100%;
  }

  .bg-image {
    position: absolute;
    left: 0;
    top: 0;
    opacity: ${({ theme }) => (theme.name === 'light' ? 0.3 : 0.15)};
    z-index: -100;
    height: 100%;
  }

  h2 {
    font-weight: 600;
    text-align: center;
  }
  .card-wrapper {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
  }

  .card {
    width: 300px;
    margin: 10px;
    background-color: ${({ theme }) =>
      theme.name === 'light' ? '#edc9a5' : '#555760'};
    box-shadow: 0 5px 10px 0 ${({ theme }) => theme.colors.font + '40'};
    height: 400px;

    &:hover {
      .card__caption {
        top: 50%;
        transform: translateY(-50%);
      }

      .card__image {
        transform: translateY(-10px);
      }

      .card__thumb {
        &::after {
          top: 0;
        }
      }

      .card__snippet {
        margin: 20px 0;
      }

      img {
        transform: scale(1.1);
      }
    }

    &__thumb {
      position: relative;
      max-height: 400px;
      height: 100%;

      overflow: hidden;

      max-height: 500px;

      &::after {
        position: absolute;
        top: 0;
        display: block;
        content: '';
        width: 100%;
        height: 100%;
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.5) 40%,
          rgba(255, 255, 255, 0) 100%
        );
        transition: 0.3s;

        top: calc(100% - 140px);
      }
    }

    &__image {
      transition: 0.5s ease-in-out;
    }

    &__caption {
      position: absolute;
      top: 50%;
      z-index: 1;
      padding: 0 20px;
      color: white;
      transform: translateY(-50%);
      text-align: center;
      transition: 0.3s;

      top: calc(100% - 50px);
      transform: unset;
    }

    &__title {
      display: -webkit-box;
      max-height: 85px;
      overflow: hidden;
      font-family: 'Playfair Display', serif;
      font-size: 23px;
      line-height: 28px;
      text-shadow: 0px 1px 5px black;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    &__snippet {
      display: -webkit-box;
      max-height: 150px;
      margin: 20px 0;
      overflow: hidden;
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      line-height: 20px;
      text-overflow: ellipsis;
      transition: 0.5s ease-in-out;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;

      margin: 60px 0;
    }

    &__button {
      display: inline-block;
      padding: 10px 20px;
      color: white;
      border: 1px solid white;
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      text-transform: uppercase;
      text-decoration: none;
      transition: 0.3s;

      &:hover {
        color: black;
        background-color: white;
      }
    }
  }
`;
