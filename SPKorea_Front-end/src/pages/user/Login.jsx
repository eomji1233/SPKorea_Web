import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

export default function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!username.trim()) {
            setError('아이디를 입력하세요.');
            return;
        }

        if (!password.trim()) {
            setError('비밀번호를 입력하세요.');
            return;
        }

        setError(null);

        try {
            const res = await fetch("https://spkorea.art/api/auth/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) throw new Error('아이디 또는 비밀번호가 잘못되었습니다.');

            const data = await res.json();
            login(data.token);
            navigate('/');
        } catch (err) {
            setError('아이디 또는 비밀번호가 잘못되었습니다.');
        }
    };

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>

                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Id"
                    autoComplete="username"
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                />

                <button type="submit">Login</button>
                {error && <p className="error-msg">{error}</p>}
            </form>
        </div>
    );
}
