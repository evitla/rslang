import styled from 'styled-components';

export const ResultWrapper = styled.div`
  min-width: 500px;
  margin: auto;
  padding: 30px 20px;
  border-radius: 40px;

  h3 {
    text-align: center;
  }
`;

export const TableWrapper = styled.div`
  max-height: 65vh;
  min-height: 400px;
  overflow-y: scroll;
`;

export const StyledTable = styled.table`
  border-spacing: 0;
  border: 3px solid hsla(0, 0%, 100%, 0.7);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 20px;
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
