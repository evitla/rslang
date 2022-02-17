import styled from 'styled-components';
import { StyledButton } from '../../styles/components';

export const StyledBook = styled.div<{ allLearned: boolean }>`
  background-color: ${({ allLearned, theme }) =>
    allLearned ? 'green' : theme.colors.bg};
`;

export const Chapter = styled(StyledButton)<{ color: string; active: boolean }>`
  background: ${({ color }) => color};
  border: ${({ active }) => (active ? '1px solid rgba(0, 0, 0, 0.4)' : 0)};
  border-bottom: 1px solid
    ${({ active }) => (active ? 'transparent' : 'rgba(0, 0, 0, 0.4)')};
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
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 20px ${({ scrollColor }) => scrollColor};
  }
`;
