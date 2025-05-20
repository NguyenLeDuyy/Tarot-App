// ... existing code ...
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // <<<<<< IMPORT MỚI

const Header: React.FC = () => {
    const { isLoggedIn, user, logout, isLoading } = useAuth(); // <<<<<< SỬ DỤNG HOOK
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        // Tùy chọn: Chuyển hướng người dùng về trang chủ hoặc trang đăng nhập sau khi logout
        navigate('/');
    };

    // Trong khi đang kiểm tra trạng thái đăng nhập, có thể hiển thị một placeholder hoặc không gì cả
    if (isLoading) {
        return (
            <header className="relative z-20 px-6 sm:px-10 py-5 flex justify-between items-center bg-slate-900/70 backdrop-blur-lg border-b border-purple-700/50 shadow-xl">
                <Link to="/" className="flex items-center gap-3 group">
                    <img src="/src/assets/bg/logo.png" alt="Tarot Horizon Logo" className="h-10 sm:h-12 drop-shadow-lg" />
                    <span className="text-xl sm:text-2xl font-bold tracking-wider font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        Tarot Horizon
                    </span>
                </Link>
                <div className="h-8 w-48 bg-gray-700 animate-pulse rounded"></div> {/* Placeholder loading */}
            </header>
        );
    }


    return (
        <header className="relative z-20 px-6 sm:px-10 py-5 flex justify-between items-center bg-slate-900/70 backdrop-blur-lg border-b border-purple-700/50 shadow-xl">
            <Link to="/" className="flex items-center gap-3 group">
                {/* Sửa lại đường dẫn logo nếu cần, /src/assets/... là đường dẫn tuyệt đối từ root dự án khi build */}
                <img src="/src/assets/bg/logo.png" alt="Tarot Horizon Logo" className="h-10 sm:h-12 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xl sm:text-2xl font-bold tracking-wider font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 group-hover:from-purple-300 group-hover:to-pink-400 transition-all duration-300">
                    Tarot Horizon
                </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-5 lg:space-x-7 text-sm font-medium">
                {["Trang chủ", "Xem Tarot", "Hướng dẫn", "Giới thiệu"].map((label, i) => (
                    <Link
                        key={label}
                        to={['/', '/tarot/select-spread', '/guide', '/about'][i]} // Cập nhật các route này nếu cần
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-300 relative group py-2"
                    >
                        <span>{label}</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </Link>
                ))}
            </nav>

            {/* Phần Đăng nhập/Đăng ký hoặc Tên User/Đăng xuất */}
            <div className="hidden md:flex items-center space-x-3">
                {isLoggedIn && user ? (
                    <>
                        <span className="text-purple-300 font-medium">Chào, {user.name || user.email.split('@')[0]}!</span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg text-sm font-semibold bg-pink-600 hover:bg-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Đăng xuất
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:bg-purple-700 hover:text-white transition-colors duration-300">
                                Đăng nhập
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                Đăng ký
                            </button>
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu Button (cần logic để toggle menu) */}
            <div className="md:hidden">
                <button className="text-gray-300 hover:text-purple-400 focus:outline-none">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                    {/* TODO: Xử lý menu mobile sẽ cần hiển thị user/logout hoặc login/register tương ứng */}
                </button>
            </div>

            <Link to="/tarot/history" className="nav-link">
                Lịch Sử Bói
            </Link>
        </header>
    );
};

export default Header;

// ... existing code ...