import styled from 'styled-components';

export const StyledBook = styled.div<{ allLearned: boolean }>`
  background-color: ${({ allLearned }) => (allLearned ? 'green' : 'white')};
`;
