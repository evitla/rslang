import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { TUser } from '../types';
import useLogin from './useLogin';
import useCreateUser from './useCreateUser';

const useRegistrationForm = (setIsOpen: (isOpen: boolean) => void) => {
  const [isRegistrationForm, setIsRegistrationForm] = useState(true);

  const handleIsRegistrationForm = () =>
    setIsRegistrationForm(!isRegistrationForm);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUser>();

  const addUser = useCreateUser();
  const loginUser = useLogin();

  const onSubmit = async (user: TUser) => {
    if (isRegistrationForm) {
      await addUser.mutateAsync(user);
    } else {
      await loginUser.mutateAsync(user);
    }

    setIsOpen(false);
  };

  return {
    isLoading: addUser.isLoading || loginUser.isLoading,
    isError: addUser.isError || loginUser.isError,
    isRegistrationForm,
    handleIsRegistrationForm,
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
  };
};

export default useRegistrationForm;
