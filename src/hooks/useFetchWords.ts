import { QueryOptions, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { QUERY_KEY_WORDS, WORDS_URL } from '../constants';
import { TWord } from '../types';
import { getAll } from '../utils';

const useFetchWords = (
  group: number,
  page: number,
  options: QueryOptions = {}
) => {
  const navigate = useNavigate();
  const url = `${WORDS_URL}?group=${group}&page=${page}`;

  const query = useQuery(
    [QUERY_KEY_WORDS, group, page],
    async () => {
      const data = await getAll(url, navigate);
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
