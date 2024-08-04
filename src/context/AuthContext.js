'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return typeof window !== 'undefined' ? localStorage.getItem('token') || null : null;
    });
    
    const [userId, setUserId] = useState(() => {
        return typeof window !== 'undefined' ? localStorage.getItem('userId') || null : null;
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
        
        if (userId) {
            localStorage.setItem('userId', userId);
        } else {
            localStorage.removeItem('userId');
        }
    }, [token, userId]);

    const updateAuth = (token, userId) => {
        setToken(token);
        setUserId(userId);
    };

    return (
        <AuthContext.Provider value={{ token, userId, updateAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
