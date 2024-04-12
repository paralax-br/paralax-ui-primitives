import React, { createContext, useContext } from 'react';
import { ButtonProps } from '.';

const ButtonContext = createContext<ButtonProps>({} as ButtonProps);

export const ButtonProvider = ({ children, ...rest }: ButtonProps) => {
  return (
    <ButtonContext.Provider value={{ children, ...rest }}>
      {children}
    </ButtonContext.Provider>
  );
};

export const useButtonContext = () => {
  const context = useContext(ButtonContext);

  return context;
};
