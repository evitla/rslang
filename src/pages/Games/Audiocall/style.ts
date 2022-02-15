import styled from 'styled-components';

export const GamePreview = styled.div<{ isPlay: boolean }>`
  ${(props) =>
    props.isPlay &&
    `
    display: none;
  `}
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 100%;
  max-height: 400px;
  margin: 0 auto;
  h2 {
    text-align: center;
    margin-bottom: 5px;
  }
`;

export const GameBg = styled.div<{ isPlay: boolean }>`
  ${(props) =>
    !props.isPlay &&
    `
    display: none;
`}
  background: #f5cd79;
`;

export const GamePlay = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
