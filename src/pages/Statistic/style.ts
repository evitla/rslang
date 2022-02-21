import styled from "styled-components";

export const StyledStatistic = styled.div`
  h2 {
    text-align: center;
  }

  h3 {
    margin: 1rem 0;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 1px;
      background-color: ${({ theme }) => theme.colors.font};
    }
  }
`;

export const StyledGameInfo = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.font};
  border-radius: 8px;
  padding: 1.5rem 1rem;
  display: inline-block;

  h4 {
    margin-bottom: 6px;
  }

  p + p {
    margin-top: 4px;
  }
`;