import { createContext, useContext } from 'react';

export const SetIsAuthFormOpenContext = createContext({
  isAuthFormOpen: false,
  setIsAuthFormOpen: (_: boolean) => {},
});

const useOpenAuthForm = () => useContext(SetIsAuthFormOpenContext);

export default useOpenAuthForm;
