import { useMutation } from 'react-query';
import { SIGNIN_URL, USERS_URL } from '../constants';
import { TUser } from '../types';
import { create, loginUser } from '../utils';

const useCreateUser = () => {
  const addUser = useMutation((user: TUser) => create(USERS_URL, user), {
    onSuccess: (user) => loginUser(SIGNIN_URL, user),
  });

  return addUser;
};

export default useCreateUser;
