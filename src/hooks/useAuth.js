import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(() => window.localStorage.getItem('token'));
  const [userId, setUserId] = useState(() => window.localStorage.getItem('userId'));

  const updateToken = (newToken, newUserId) => {
    if (newToken) {
      window.localStorage.setItem('token', newToken);
      if (newUserId) {
        window.localStorage.setItem('userId', newUserId);
      }
    } else {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('userId'); 
    }
    setToken(newToken);
    setUserId(newUserId);
  };

  return { token, userId, updateToken };
};
