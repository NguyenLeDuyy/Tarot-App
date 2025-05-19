import React, { useState } from 'react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Đăng nhập thành công!');
                // Lưu token vào localStorage nếu backend trả về, chuyển hướng sang trang chính
            } else {
                alert(data.message || 'Đăng nhập thất bại!');
            }
        } catch (error) {
            alert('Lỗi kết nối server!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit">Đăng nhập</button>
        </form>
    );
};

export default Login;
