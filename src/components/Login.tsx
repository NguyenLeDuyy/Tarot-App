// ... existing code ...
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header'; // Header không cần thiết ở đây nữa nếu Login là 1 page riêng
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext'; // <<<<<< IMPORT MỚI

// Giả sử bạn có một component Modal, ví dụ:
// import Modal from './Modal'; // Hoặc từ một thư viện

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // <<<<<< SỬ DỤNG HOOK
    const [error, setError] = useState<string | null>(null); // State cho thông báo lỗi
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset lỗi trước mỗi lần submit
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                // Giả sử API trả về user object và token
                const userData = {
                    id: data.user.id, // Hoặc data.id tùy theo API
                    email: data.user.email, // Hoặc data.email
                    name: data.user.name, // Tên người dùng nếu có
                };
                // const token = data.token;

                login(userData /*, token */); // <<<<<< GỌI HÀM LOGIN TỪ CONTEXT

                // Hiển thị popup thành công
                setShowSuccessPopup(true);
                // Tự động đóng popup và chuyển hướng sau vài giây
                setTimeout(() => {
                    setShowSuccessPopup(false);
                    navigate('/'); // Chuyển hướng về trang chủ hoặc dashboard
                }, 2000); // 2 giây

            } else {
                setError(data.message || 'Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.');
            }
        } catch (err) {
            console.error('Lỗi đăng nhập:', err);
            setError('Lỗi kết nối đến server! Vui lòng thử lại sau.');
        }
    };

    return (
        // Bố cục bao gồm cả Header và Footer nếu Login là một trang đầy đủ
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#18122B] via-[#2D1B4A] to-[#3E206D] text-white font-sans relative overflow-hidden">
            {/* <Header /> */} {/* Nếu Header đã được xử lý ở App.tsx hoặc layout chung thì không cần ở đây */}

            {/* Hiệu ứng nền (nếu cần cho trang login riêng) */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <img
                    src="/src/assets/bg/Home.png" // Đảm bảo đường dẫn
                    alt="Mystical background"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#18122B] opacity-70"></div>
            </div>

            <main className="flex-grow relative z-10 flex flex-col items-center justify-center px-4 py-10"> {/* flex-grow để main chiếm không gian */}
                <div className="bg-[#2D1B4A]/80 rounded-2xl shadow-2xl p-8 sm:p-10 max-w-md w-full border border-purple-500 backdrop-blur-md">
                    <h2 className="text-3xl font-bold mb-8 text-center text-purple-300 drop-shadow-lg font-['Cinzel',_serif]">
                        Đăng Nhập
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email-login" className="block text-sm font-medium text-purple-200 mb-1">
                                Email
                            </label>
                            <input
                                id="email-login"
                                type="email"
                                placeholder="emailcuaban@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-purple-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-white placeholder-gray-500 transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="password-login" className="block text-sm font-medium text-purple-200 mb-1">
                                Mật khẩu
                            </label>
                            <input
                                id="password-login"
                                type="password"
                                placeholder="Nhập mật khẩu của bạn"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-slate-800/70 border border-purple-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-white placeholder-gray-500 transition-all"
                            />
                        </div>
                        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                        <button
                            type="submit"
                            className="w-full px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                        >
                            Đăng nhập
                        </button>
                    </form>
                    <p className="mt-8 text-center text-sm text-gray-400">
                        Chưa có tài khoản?{' '}
                        <Link to="/register" className="font-medium text-purple-400 hover:text-pink-500 hover:underline transition-colors duration-300">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </main>

            {/* Popup đăng nhập thành công */}
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-700 p-8 rounded-xl shadow-2xl text-center max-w-sm mx-auto border border-purple-400">
                        <div className="text-5xl mb-4">🎉</div>
                        <h3 className="text-2xl font-bold text-white mb-3 font-['Cinzel',_serif]">Đăng Nhập Thành Công!</h3>
                        <p className="text-purple-200 mb-6">Chào mừng bạn trở lại Tarot Horizon. Bạn sẽ được chuyển hướng...</p>
                        {/* Nút đóng có thể không cần thiết nếu tự động đóng */}
                        {/* <button 
                            onClick={() => {
                                setShowSuccessPopup(false);
                                navigate('/');
                            }}
                            className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold transition-colors"
                        >
                            OK
                        </button> */}
                    </div>
                </div>
            )}

            {/* <Footer /> */} {/* Tương tự Header, nếu đã có ở layout chung */}
        </div>
    );
};

export default Login;

// ... existing code ...