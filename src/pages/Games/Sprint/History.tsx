import React from 'react';
import { FILES_URL } from '../../../constants';
import { Thistory, TWord } from '../../../types';
import { playAudio } from '../../../utils';
import { ResultsWrapper } from './styles';

type Tprops = {
  history: Thistory[];
  words: TWord[];
};

export default function History(props: Tprops) {
  const { history, words } = props;
  function findUrl(allWords: TWord[], currenWord: string) {
    return allWords.find((w) => w.word === currenWord)?.audio;
  }
  async function playSound(allWords: TWord[], currenWord: string) {
    const fileName = findUrl(allWords, currenWord);
    await playAudio(`${FILES_URL}/${fileName}`);
  }
  return (
    <ResultsWrapper>
      <ul>
        {history.map((h, index) => {
          return (
            <li key={index}>
              <span>{h.guessWord}</span> <span>{String(h.result)}</span>
              <div>
                <button
                  onClick={() => playSound(words, h.guessWord)}
                  type="button"
                >
                  PlayAudio
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </ResultsWrapper>
  );
}
