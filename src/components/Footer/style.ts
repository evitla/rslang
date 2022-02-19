import styled from 'styled-components';

export const StyledFooter = styled.footer`
  padding: 10px 15px;
  margin-top: auto;
  height: 60px;
  display: flex;
  align-items: center;
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;

    ul {
      width: 350px;
    }
  }
`;
