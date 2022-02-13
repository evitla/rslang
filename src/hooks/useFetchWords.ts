import { QueryOptions, useQuery } from 'react-query';
import { QUERY_KEY_WORDS, WORDS_URL } from '../constants';
import { TWord } from '../types';
import { getAll } from '../utils';

const useFetchWords = (
  group: number,
  page: number,
  options: QueryOptions = {}
) => {
  const url = `${WORDS_URL}?group=${group}&page=${page}`;

  const query = useQuery(
    [QUERY_KEY_WORDS, group, page],
    async () => {
      const data = await getAll<TWord>(url);
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
