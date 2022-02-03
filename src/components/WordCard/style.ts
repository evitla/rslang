import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
`;

export const ImageContainer = styled.div<{ bgImage: string }>`
  width: 400px;
  height: 300px;
  background: url(${({ bgImage }) => bgImage}) no-repeat;
  background-size: cover;
  background-position: center;
`;

export const CardContent = styled.div`
  background-color: rgba(255, 255, 255, 0.65);
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px 16px;
`;

export const WordInfo = styled.div`
  display: flex;
  column-gap: 8px;
`;
