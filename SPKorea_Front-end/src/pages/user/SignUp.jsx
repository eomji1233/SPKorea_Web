import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

export default function SignUp() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validate = () => {
        const newErrors = {};

        if (!/^[a-zA-Z0-9]{4,20}$/.test(form.username)) {
            newErrors.username = '아이디는 4~20자의 영문자 또는 숫자만 가능합니다.';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = '올바른 이메일 형식을 입력하세요.';
        }
        if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(form.password)) {
            newErrors.password = '비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다.';
        }
        if (form.password < 1) {
            newErrors.confirmPassword = '비밀번호 확인을 입력하세요.';
        }
        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        }

        return newErrors;
    };

    const focusFirstError = (errors) => {
        const errorFields = [
            { key: 'username', ref: usernameRef },
            { key: 'email', ref: emailRef },
            { key: 'password', ref: passwordRef },
            { key: 'confirmPassword', ref: confirmPasswordRef },
        ];

        for (const field of errorFields) {
            if (errors[field.key] && field.ref.current) {
                field.ref.current.focus();
                field.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                break;
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            focusFirstError(validationErrors);
            return;
        }

        setErrors({}); 

        try {
            const res = await fetch('https://spkorea.art/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: form.username,
                    email: form.email,
                    password: form.password,
                }),
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message || '회원가입 실패');
            }

            alert('회원가입이 완료되었습니다.');
            navigate('/login');
            
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signUp-wrapper">
            <form className="signUp-form" onSubmit={handleSubmit}>
                <h2>SignUp</h2>

                <input
                    ref={usernameRef}
                    className={`form-input ${errors.username ? "error" : ""}`}
                    type="text"
                    name="username"
                    placeholder="Id"
                    value={form.username}
                    onChange={handleChange}
                    autoComplete="username"
                />
                {errors.username && <p className="error-text">{errors.username}</p>}

                <input
                    ref={emailRef}
                    className={`form-input ${errors.email ? "error" : ""}`}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                />
                {errors.email && <p className="error-text">{errors.email}</p>}

                <input
                    ref={passwordRef}
                    className={`form-input ${errors.password ? "error" : ""}`}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                />
                {errors.password && <p className="error-text">{errors.password}</p>}

                <input
                    ref={confirmPasswordRef}
                    className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                />
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

                <button type="submit">SignUp</button>
                {error && <p className="error-msg">{error}</p>}
            </form>
        </div>
    );
}
