import useFetchWords from '../../../hooks/useFetchWords';

export const fetchQuestion = async (group: number, page: number) => {
  const { words } = useFetchWords(group, page);
};
