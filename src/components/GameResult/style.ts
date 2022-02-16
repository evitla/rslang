import styled from 'styled-components';

export const ResultWrapper = styled.div`
  display: grid;
  min-width: 500px;
  margin: auto;
  padding: 30px 20px;
  border-radius: 40px;

  h3 {
    text-align: center;
  }

  .back-to-games {
    padding: 5px 10px;
    background: none;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 8px;
    margin-left: auto;
    color: #fff;
    border: 2px solid #fff;
    transition: all 0.3s linear;
    font-weight: 600;

    &:hover {
      background: #ffe4c4;
    }
  }
`;

export const TableWrapper = styled.div`
  max-height: 65vh;
  min-height: 400px;
  border: 3px solid hsla(0, 0%, 100%, 0.7);
  border-radius: 20px;
  padding: 15px;
  overflow-y: scroll;
  .img {
    display: block;
    width: 100%;
    max-width: 30px;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
`;

export const StyledTable = styled.table`
  border-spacing: 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  color: #333;

  th {
    padding: 5px 10px;
  }

  td {
    padding: 5px 8px;
    border-collapse: collapse;
    border: none;
    vertical-align: center;
    text-align: center;
  }
`;
