import React from 'react';
import { FILES_URL } from '../../../constants';
import { Thistory, TWord } from '../../../types';
import { playAudio } from '../../../utils';
import { ResultsWrapper } from './styles';
import soundSVG from '../../../assets/images/sound.svg';

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
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history.map((h, index) => {
            return (
              <tr key={index}>
                <td>{h.guessWord}</td>
                <td>{h.result ? '✔️' : '❌'}</td>
                <td>
                  <button
                    onClick={() => playSound(words, h.guessWord)}
                    type="button"
                    className="play-sound"
                  >
                    <img className="img" src={soundSVG} alt="" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ResultsWrapper>
  );
}
