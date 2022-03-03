import { useMutation } from 'react-query';

import { USERS_URL } from '../constants';
import { TUser } from '../types';
import { create } from '../utils';

const useCreateUser = () => {
  const addUser = useMutation(async (user: TUser) => {
    const data = await create(USERS_URL, user);
    return data;
  });

  return addUser;
};

export default useCreateUser;
