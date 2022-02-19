import React from 'react';
import { IntroSection } from '../Home/style';

import bgSVG from '../../assets/images/bg.svg';
import { StyledButton } from '../../styles/components';
import { Link } from 'react-router-dom';

const Error = () => (
  <IntroSection>
    <img src={bgSVG} alt="" />
    <h2>Хмм, что-то пошло не так</h2>
    <p>
      Данная страница недоступна, но если вы перепроверите адресную строку, мы
      будем рады попробовать еще раз.
    </p>
    <Link to="/">
      <StyledButton className="gradient-btn">На Главную</StyledButton>
    </Link>
  </IntroSection>
);

export default Error;
