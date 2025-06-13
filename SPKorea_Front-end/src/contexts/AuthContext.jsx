import React, { createContext, useContext, useEffect, useState } from 'react';
import { parseJwt, getRolesFromToken, isTokenExpired } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const navigate = useNavigate();
    const [isLoading, setIsLoading ] = useState(true);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        setIsLoading(false);
    };

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken && !isTokenExpired(savedToken)) {
            const payload = parseJwt(savedToken);
            const roles = getRolesFromToken(savedToken);
            setUser({ username: payload.sub, roles });
            setToken(savedToken);
        } else {
            logout();
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!token) return;

        const payload = parseJwt(token);
        const expiresAt = payload.exp * 1000;
        const now = Date.now();
        const timeout = expiresAt - now;

        if (timeout <= 0) {
            logout();
            return;
        }

        const timerId = setTimeout(() => {
            alert('세션이 만료되어 로그아웃되었습니다.');
            logout();
        }, timeout);

        return () => clearTimeout(timerId);
    }, [token]);

    const login = (jwt) => {
        localStorage.setItem('token', jwt);
        const payload = parseJwt(jwt);
        const roles = getRolesFromToken(jwt);
        setUser({ username: payload.sub, roles });
        setToken(jwt);
    };

    const isLoggedIn = !!token;

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn, isLoading }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
