import React from 'react';
import WordCard from '../../components/WordCard';
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
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px 48px',
          }}
        >
          {words.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
        </div>
      )}
    </>
  );
};

export default Book;
