import React, { useRef } from 'react';

import useRegistrationForm from '../../hooks/useRegistrationForm';
import useClickOutside from '../../hooks/useClickOutside';
import {
  EMAIL_VALIDATION,
  MIN_PASSWORD_LENGTH,
  NAME_VALIDATION,
} from '../../constants';
import { ModalWindow, StyledForm } from './style';

const AuthForm = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  const authRef = useRef<HTMLFormElement>(null);
  useClickOutside(authRef, setIsOpen);

  const {
    isRegistrationForm,
    isEmailInDB,
    doesPasswordMatch,
    handleIsRegistrationForm,
    register,
    onSubmit,
    errors,
  } = useRegistrationForm(setIsOpen);

  return (
    <ModalWindow>
      <StyledForm ref={authRef} onSubmit={onSubmit}>
        {isRegistrationForm && (
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register('name', {
                required: {
                  value: true,
                  message: 'Name is required',
                },
                pattern: {
                  value: NAME_VALIDATION,
                  message: 'Name is not valid',
                },
              })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
        )}
        <div>
          <input
            type="text"
            placeholder="Email"
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: EMAIL_VALIDATION,
                message: 'Email is not valid',
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: {
                value: MIN_PASSWORD_LENGTH,
                message: 'Password must have at least 8 characters',
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <input
          type="submit"
          value={isRegistrationForm ? 'Зарегистрироваться' : 'Войти'}
        />
        {isRegistrationForm ? (
          <div>
            <span>Есть аккаунт?</span>
            <button onClick={handleIsRegistrationForm}>Войти</button>
          </div>
        ) : (
          <div>
            <button onClick={handleIsRegistrationForm}>
              Зарегистрироваться
            </button>
          </div>
        )}
        {isEmailInDB && (
          <span>У Вас уже есть аккаунт. Войдите с помощью него</span>
        )}
        {!doesPasswordMatch && <span>Введен неправильный пароль</span>}
      </StyledForm>
    </ModalWindow>
  );
};

export default AuthForm;
