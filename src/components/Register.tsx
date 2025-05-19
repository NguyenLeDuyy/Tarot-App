import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Mật khẩu và xác nhận mật khẩu không khớp!');
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
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                navigate('/login');
            } else {
                alert(data.message || 'Đăng ký thất bại!');
            }
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
            alert('Lỗi kết nối đến server!');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#18122B] via-[#2D1B4A] to-[#3E206D] text-white font-sans relative overflow-hidden">
            <Header />

            <div className="absolute inset-0 pointer-events-none z-0">
                <img
                    src="src/assets/bg/Home.png"
                    alt="Mystical background"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#18122B] opacity-70"></div>
            </div>

            <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-88px)] px-4 py-10">
                <div className="bg-[#2D1B4A]/80 rounded-2xl shadow-2xl p-8 sm:p-10 max-w-md w-full border border-purple-500 backdrop-blur-md">
                    <h2 className="text-3xl font-bold mb-8 text-center text-purple-300 drop-shadow-lg font-['Cinzel',_serif]">
                        Tạo Tài Khoản
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email-register" className="block text-sm font-medium text-purple-200 mb-1">
                                Email
                            </label>
                            <input
                                id="email-register"
                                type="email"
                                placeholder="emailcuaban@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-purple-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-white placeholder-gray-500 transition-all duration-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="password-register" className="block text-sm font-medium text-purple-200 mb-1">
                                Mật khẩu
                            </label>
                            <input
                                id="password-register"
                                type="password"
                                placeholder="Tạo mật khẩu"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-purple-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-white placeholder-gray-500 transition-all duration-300"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword-register" className="block text-sm font-medium text-purple-200 mb-1">
                                Xác nhận mật khẩu
                            </label>
                            <input
                                id="confirmPassword-register"
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-purple-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-white placeholder-gray-500 transition-all duration-300"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                        >
                            Đăng ký
                        </button>
                    </form>
                    <p className="mt-8 text-center text-sm text-gray-400">
                        Đã có tài khoản?{' '}
                        <Link to="/login" className="font-medium text-purple-400 hover:text-pink-500 hover:underline transition-colors duration-300">
                            Đăng nhập tại đây
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Register;
