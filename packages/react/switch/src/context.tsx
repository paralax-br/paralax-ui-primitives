import React, { createContext, useContext } from 'react';
import { SwitchProps } from '.';

const SwitchContext = createContext<SwitchProps>({} as SwitchProps);

export const SwitchProvider = ({ children, ...rest }: SwitchProps) => {
  return (
    <SwitchContext.Provider value={{ children, ...rest }}>
      {children}
    </SwitchContext.Provider>
  );
};

export const useSwitchContext = () => {
  const context = useContext(SwitchContext);

  return context;
};
