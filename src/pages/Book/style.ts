import styled from 'styled-components';
import { StyledButton } from '../../styles/components';

export const StyledBook = styled.div<{
  allLearned: boolean;
  groupColor: string;
}>`
  background-color: ${({ theme }) => theme.colors.bg};

  .chapters {
    border-bottom: 1px solid ${({ theme }) => theme.colors.font + 'B3'};
  }

  .pagination {
    display: flex;
    margin: 8px auto;
    width: 40%;
    justify-content: space-between;

    li {
      a {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.font + '40'};
        border-radius: 4px;
        padding: 0.25em 1em;
      }

      &.selected a {
        background-color: ${({ theme, allLearned, groupColor }) =>
          allLearned ? groupColor : theme.colors.font + 'B3'};
        color: ${({ theme }) => theme.colors.bg};
        font-weight: 600;
        text-decoration: underline;
      }
    }
  }
`;

export const Chapter = styled(StyledButton)<{ color: string; active: boolean }>`
  background: ${({ color }) => color};
  border: ${({ active, theme }) =>
    active ? `1px solid ${theme.colors.font}B3` : 0};
  border-bottom: 1px solid
    ${({ active, theme }) =>
      active ? 'transparent' : `${theme.colors.font}B3`};
  margin-bottom: -1px;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.7em ${({ active }) => (active ? '2em' : '1.5em')};
`;

export const WordCardsContainer = styled.div<{ scrollColor: string }>`
  overflow-y: scroll;
  height: calc(100vh - 200px);
  display: grid;
  row-gap: 2rem;
  margin: 0 0 0 -10px;
  padding: 10px 0 0 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 6px ${({ theme }) => theme.colors.font + '50'};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 20px ${({ scrollColor }) => scrollColor};
  }
`;
