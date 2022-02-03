import { QueryOptions, useQuery } from 'react-query';
import { QUERY_KEY_WORDS, WORDS_URL } from '../constants';
import { TWord } from '../types';
import { getAll } from '../utils';

const useFetchWords = (
  group: number,
  page: number,
  options: QueryOptions = {}
) => {
  const query = useQuery(
    QUERY_KEY_WORDS,
    async () => {
      const queryParams = `?group=${group}&page=${page}`;
      const data = await getAll<TWord[]>(WORDS_URL, queryParams);
      return data;
    },
    options
  );

  return {
    ...query,
    words: query.data as TWord[],
  };
};

export default useFetchWords;
