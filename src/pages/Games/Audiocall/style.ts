import styled from 'styled-components';

export const GamePreview = styled.div`
  display: grid;
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 100%;
  max-height: 400px;
  margin: 0 auto;
  padding-top: 20px;
  h2 {
    text-align: center;
    margin-bottom: 5px;
  }

  .back {
    width: 100%;
    max-width: 170px;
    padding: 10px 5px;
    background: #f39c12;
    color: #fff;
    border: none;
    cursor: pointer;
    border: 2px solid #e67e22;
    margin: 20px auto;
    transition: all 0.3s linear;

    &:hover {
      background: #c0392b;
    }
  }

  .btns-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const GameBg = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  background-image: linear-gradient(to right, #ffafbd, #ffc3a0);
  height: calc(100% - 25px);
`;

export const GamePlay = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  .loading {
    margin: auto;
    font-weight: 600;
    font-size: 18px;
  }
`;
