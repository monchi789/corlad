import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DropdownContextType {
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  return (
    <DropdownContext.Provider value={{ isDropdownOpen, toggleDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
};
