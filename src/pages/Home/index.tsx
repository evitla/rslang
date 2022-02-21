import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import useOpenAuthForm from '../../hooks/useOpenAuthForm';
import { TStore } from '../../store';

import { IntroSection, Advantages } from './style';
import { StyledButton } from '../../styles/components';
import bgSVG from '../../assets/images/bg.svg';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: TStore) => state.userReducer);
  const { setIsAuthFormOpen } = useOpenAuthForm();

  const handleGetStarted = () => {
    if (user !== null) {
      navigate('/games');
    } else {
      setIsAuthFormOpen(true);
    }
  };

  const handleAboutTeam = () => {
    navigate('/about-team');
  };

  return (
    <>
      <IntroSection>
        <img src={bgSVG} alt="" />
        <h2>Развивай</h2>
        <h2 className="gradient-title">Навыки Английского</h2>
        <h2>Играя в Игры</h2>
        <p>
          Изучай английский язык играя в мини-игры и используя удобный
          электронный учебник с аудио и примерами.
        </p>
        <div className="btn-container">
          <StyledButton className="gradient-btn" onClick={handleGetStarted}>
            Начать
          </StyledButton>
          <button className="about-team-btn" onClick={handleAboutTeam}>
            О команде
          </button>
        </div>
      </IntroSection>
      <Advantages>
        <img className="bgc-image" src={bgSVG} alt="" />
        <h2>Особенности</h2>
        <div className="advantages-container">
          <div className="card">
            <h3>Изучай</h3>
            <p>
              В учебнике собраны 3600 самых используемых в повседневной жизни
              слов, есть его определение и пример как на русском так и на
              английском!
            </p>
          </div>
          <div className="card">
            <h3>Повторяй</h3>
            <p>
              Все слова которые ты изучил попадают в твой личный словарь. Ты
              можешь отметить сложные для тебя слова, чтобы знать, на что чаще
              обращать внимание!
            </p>
          </div>
          <div className="card">
            <h3>Следи за прогрессом</h3>
            <p>
              В личном кабинете ты можешь следить за своим прогрессом: сколько
              слов ты уже выучил всего и за каждый день.
            </p>
          </div>
        </div>
      </Advantages>
    </>
  );
};

export default Home;
