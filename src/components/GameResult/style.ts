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
  min-height: 400px;
  border: 3px solid hsla(0, 0%, 100%, 0.7);
  border-radius: 20px;
  padding: 15px;
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
