import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DropdownContextType {
  dropdownStates: Record<string, boolean>;
  toggleDropdown: (dropdownName: string) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};

export const DropdownProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({});

  const toggleDropdown = (dropdownName: string) => {
    setDropdownStates(prev => ({
      ...prev,
      [dropdownName]: !prev[dropdownName],
    }));
  };

  return (
    <DropdownContext.Provider value={{ dropdownStates, toggleDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
};
