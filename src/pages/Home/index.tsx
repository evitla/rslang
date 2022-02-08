import React from 'react';
import { useSelector } from 'react-redux';
import { TStore } from '../../store';

const Home = () => {
  const { user } = useSelector((state: TStore) => state.userReducer);

  return <h2>{user?.name ? `Hello, ${user.name}!` : 'Home page'} </h2>;
};

export default Home;
