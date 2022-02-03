import React from 'react';
import useFetchWords from '../../hooks/useFetchWords';

const Book = () => {
  const { words, isLoading, isError } = useFetchWords(0, 0);

  return (
    <>
      <h2>Book page</h2>
      {isLoading ? (
        <div>Fetching words...</div>
      ) : isError ? (
        <div>Error while fetching</div>
      ) : (
        <ol>
          {words.map((word) => (
            <li key={word.id}>{word.word}</li>
          ))}
        </ol>
      )}
    </>
  );
};

export default Book;
