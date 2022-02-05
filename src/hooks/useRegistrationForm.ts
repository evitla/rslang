import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { create, loginUser, setLocalStorage } from '../utils';
import { SIGNIN_URL, USERS_URL } from '../constants';
import { TUser } from '../types';

const useRegistrationForm = (setIsOpen: (isOpen: boolean) => void) => {
  const [isRegistrationForm, setIsRegistrationForm] = useState(true);
  const [isEmailInDB, setIsEmailInDB] = useState(false);
  const [doesPasswordMatch, setDoesPasswordMatch] = useState(true);

  const handleIsRegistrationForm = () =>
    setIsRegistrationForm(!isRegistrationForm);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUser>();
  const onSubmit = async (user: TUser) => {
    if (isRegistrationForm) {
      try {
        await create<TUser>(USERS_URL, user);
      } catch (err) {
        setIsEmailInDB(true);
        return;
      }
    }

    try {
      const { token } = await loginUser(SIGNIN_URL, user);
      setLocalStorage('token', token);
    } catch (err) {
      setDoesPasswordMatch(false);
      return;
    }

    setIsOpen(false);
  };

  return {
    isRegistrationForm,
    isEmailInDB,
    doesPasswordMatch,
    handleIsRegistrationForm,
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
  };
};

export default useRegistrationForm;
