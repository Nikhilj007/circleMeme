import { createContext, useContext, useState } from 'react';

// Create a context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState();
  

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to access the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
