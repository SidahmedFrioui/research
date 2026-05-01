import React, { createContext, useContext, useState } from 'react';

type TitleContextType = {
  value: string;
  setValue: (val: string) => void;
};

const TitleContext = createContext<TitleContextType | undefined>(undefined);

export const TitleProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState('');

  return (
    <TitleContext.Provider value={{ value, setValue }}>
      {children}
    </TitleContext.Provider>
  );
};

export const useTitle = () => {
  const context = useContext(TitleContext);
  if (!context) throw new Error('useTitle must be used within TitleProvider');
  return context;
};
