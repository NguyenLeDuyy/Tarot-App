import React, { useState } from 'react';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Mật khẩu không khớp!');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Đăng ký thành công!');
                // Có thể chuyển sang trang đăng nhập hoặc tự động đăng nhập
            } else {
                alert(data.message || 'Đăng ký thất bại!');
            }
        } catch (error) {
            alert('Lỗi kết nối server!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Đăng ký</h2>
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
            <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
            />
            <button type="submit">Đăng ký</button>
        </form>
    );
};

export default Register;
