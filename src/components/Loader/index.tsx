import React from 'react';
import { StyledLoading } from './style';

const Loader = () => {
  return (
    <StyledLoading>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
      <span>Loading</span>
    </StyledLoading>
  );
};

export default Loader;
