import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!name.trim()) {
            setError('Vui lòng nhập tên của bạn.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Mật khẩu và xác nhận mật khẩu không khớp!');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setShowSuccessPopup(true);
                setTimeout(() => {
                    setShowSuccessPopup(false);
                    navigate('/login');
                }, 3000); // 3 giây
            } else {
                setError(data.message || 'Đăng ký thất bại!');
            }
        } catch (err) {
            console.error('Lỗi đăng ký:', err);
            setError('Lỗi kết nối đến server!');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#18122B] via-[#2D1B4A] to-[#3E206D] text-white font-sans relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0">
                <img
                    src="/src/assets/bg/Home.png"
                    alt="Mystical background"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#18122B] opacity-70"></div>
            </div>

            <main className="flex-grow relative z-10 flex flex-col items-center justify-center px-4 py-10">
                <div className="bg-[#2D1B4A]/80 rounded-2xl shadow-2xl p-8 sm:p-10 max-w-md w-full border border-purple-500 backdrop-blur-md">
                    <h2 className="text-3xl font-bold mb-8 text-center text-purple-300 drop-shadow-lg font-['Cinzel',_serif]">
                        Tạo Tài Khoản
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name-register" className="block text-sm font-medium text-purple-200 mb-1">
                                Tên của bạn
                            </label>
                            <input
                                id="name-register"
                                type="text"
                                placeholder="Ví dụ: Minh Anh"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-purple-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-white placeholder-gray-500 transition-all duration-300"
                            />
                        </div>
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
                                placeholder="Tạo mật khẩu (ít nhất 6 ký tự)"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                minLength={6}
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
                        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
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

            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-700 p-8 rounded-xl shadow-2xl text-center max-w-sm mx-auto border border-purple-400">
                        <div className="text-5xl mb-4">✅</div>
                        <h3 className="text-2xl font-bold text-white mb-3 font-['Cinzel',_serif]">Đăng Ký Thành Công!</h3>
                        <p className="text-purple-200 mb-6">Bạn sẽ được chuyển đến trang đăng nhập để tiếp tục.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register; 