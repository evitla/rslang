import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux'
import useOpenAuthForm from '../../hooks/useOpenAuthForm';
import { TStore } from '../../store';

import { IntroSection } from './style';
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
    <IntroSection>
      <img src={bgSVG} alt="" />
      <h2>Развивай</h2>
      <h2 className="gradient-title">Навыки Английского</h2>
      <h2>Играя в Игры</h2>
      <p>
        Изучай английский язык играя в мини-игры и используя удобный электронный
        учебник с аудио и примерами.
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
  );
};

export default Home;
