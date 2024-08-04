import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(() => window.localStorage.getItem('token'));

  const updateToken = (newToken) => {
    if (newToken) {
      window.localStorage.setItem('token', newToken);
    } else {
      window.localStorage.removeItem('token');
    }
    setToken(newToken); 
  };

  return { token, updateToken };
};
