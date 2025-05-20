// ... existing code ...
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // <<<<<< IMPORT MỚI
import { spreadDefinitions } from '../data/spreadDefinitions'; // <<<<<< IMPORT SPREAD DEFINITIONS

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isIntroDropdownOpen, setIsIntroDropdownOpen] = useState(false);
    const [isSpreadsDropdownOpen, setIsSpreadsDropdownOpen] = useState(false); // <<<<<< NEW: State for Spreads dropdown
    const { isLoggedIn, user, logout, isLoading } = useAuth(); // <<<<<< SỬ DỤNG HOOK
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const spreadsDropdownRef = useRef<HTMLDivElement>(null); // <<<<<< NEW: Ref for Spreads dropdown

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsIntroDropdownOpen(false);
            }
            if (spreadsDropdownRef.current && !spreadsDropdownRef.current.contains(event.target as Node)) {
                setIsSpreadsDropdownOpen(false); // <<<<<< Close Spreads dropdown
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); // Removed refs from dependency array as they don't change

    const navLinkClasses = "text-purple-200 hover:text-pink-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300";
    const activeNavLinkClasses = "text-pink-400";

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
        <header className="sticky top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#110C21] via-[#110c21c2] to-[#110C21] pt-4 pb-2 shadow-lg"> {/* Added sticky and some bg to ensure visibility */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16"> {/* Reduced height a bit */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <img src="/src/assets/bg/logo.png" alt="Tarot Horizon Logo" className="h-10 drop-shadow-lg" />
                            <span className="text-2xl font-bold font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                                Tarot Horizon
                            </span>
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center space-x-4">
                        <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} end>Trang Chủ</NavLink>

                        {/* Spreads Dropdown - Desktop */}
                        <div className="relative" ref={spreadsDropdownRef}>
                            <button
                                onClick={() => setIsSpreadsDropdownOpen(!isSpreadsDropdownOpen)}
                                onMouseEnter={() => setIsSpreadsDropdownOpen(true)}
                                className={`${navLinkClasses} flex items-center`}
                            >
                                Trải Bài
                                <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isSpreadsDropdownOpen ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                            {isSpreadsDropdownOpen && (
                                <div
                                    className="absolute mt-2 w-56 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 py-1 z-50"
                                    onMouseEnter={() => setIsSpreadsDropdownOpen(true)}
                                    onMouseLeave={() => setIsSpreadsDropdownOpen(false)}
                                >
                                    {Object.values(spreadDefinitions).map((spread) => (
                                        <NavLink
                                            key={spread.id}
                                            to={`/spreads/${spread.id}`}
                                            className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? 'text-pink-400 bg-slate-700' : 'text-purple-200 hover:bg-slate-700 hover:text-pink-300'}`}
                                            onClick={() => setIsSpreadsDropdownOpen(false)}
                                        >
                                            {spread.name}
                                        </NavLink>
                                    ))}
                                    <div className="border-t border-slate-700 my-1"></div>
                                    <NavLink
                                        to="/tarot/select-spread"
                                        className={({ isActive }) => `block px-4 py-2 text-sm font-semibold ${isActive ? 'text-pink-400 bg-slate-700' : 'text-yellow-400 hover:bg-slate-700 hover:text-yellow-300'}`}
                                        onClick={() => setIsSpreadsDropdownOpen(false)}
                                    >
                                        Xem Tất Cả Trải Bài
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        {/* Introduction Dropdown - Desktop */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsIntroDropdownOpen(!isIntroDropdownOpen)}
                                onMouseEnter={() => setIsIntroDropdownOpen(true)}
                                className={`${navLinkClasses} flex items-center`}
                            >
                                Giới Thiệu
                                <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isIntroDropdownOpen ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                            {isIntroDropdownOpen && (
                                <div
                                    className="absolute mt-2 w-48 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 py-1 z-50"
                                    onMouseEnter={() => setIsIntroDropdownOpen(true)}
                                    onMouseLeave={() => setIsIntroDropdownOpen(false)}
                                >
                                    <NavLink
                                        to="/about-tarot"
                                        className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? 'text-pink-400 bg-slate-700' : 'text-purple-200 hover:bg-slate-700 hover:text-pink-300'}`}
                                        onClick={() => setIsIntroDropdownOpen(false)}
                                    >
                                        Về Tarot
                                    </NavLink>
                                    <NavLink
                                        to="/about-project"
                                        className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? 'text-pink-400 bg-slate-700' : 'text-purple-200 hover:bg-slate-700 hover:text-pink-300'}`}
                                        onClick={() => setIsIntroDropdownOpen(false)}
                                    >
                                        Về Tarot Horizon
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        {user && (
                            <NavLink to="/tarot/history" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Lịch Sử</NavLink>
                        )}
                    </nav>
                    <div className="hidden md:flex items-center space-x-3">
                        {user ? (
                            <>
                                <span className="text-purple-300 text-sm">Chào, {user.name || user.email}!</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Đăng Xuất
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                    Đăng Nhập
                                </Link>
                                <Link to="/register" className="bg-transparent hover:bg-pink-500 text-pink-400 hover:text-white border border-pink-400 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                    Đăng Ký
                                </Link>
                            </>
                        )}
                    </div>
                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            type="button"
                            className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-purple-300 hover:text-pink-400 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state. */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-slate-800/95 backdrop-blur-md shadow-lg" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/" className={({ isActive }) => `block ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={() => setIsMobileMenuOpen(false)} end>Trang Chủ</NavLink>

                        {/* Spreads Links for Mobile */}
                        <div className="text-purple-100 px-3 py-2 text-xs font-medium uppercase">Trải Bài</div>
                        {Object.values(spreadDefinitions).map((spread) => (
                            <NavLink
                                key={`mobile-${spread.id}`}
                                to={`/spreads/${spread.id}`}
                                className={({ isActive }) => `block ${navLinkClasses} ml-2 ${isActive ? activeNavLinkClasses : ''}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {spread.name}
                            </NavLink>
                        ))}
                        <NavLink
                            to="/tarot/select-spread"
                            className={({ isActive }) => `block ${navLinkClasses} ml-2 font-semibold ${isActive ? activeNavLinkClasses : 'text-yellow-400'}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Xem Tất Cả
                        </NavLink>


                        {/* Introduction Links for Mobile */}
                        <div className="border-t border-slate-700 my-2"></div>
                        <div className="text-purple-100 px-3 py-2 text-xs font-medium uppercase">Giới Thiệu</div>
                        <NavLink to="/about-tarot" className={({ isActive }) => `block ${navLinkClasses} ml-2 ${isActive ? activeNavLinkClasses : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Về Tarot</NavLink>
                        <NavLink to="/about-project" className={({ isActive }) => `block ${navLinkClasses} ml-2 ${isActive ? activeNavLinkClasses : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Về Tarot Horizon</NavLink>


                        {user && (
                            <>
                                <div className="border-t border-slate-700 my-2"></div>
                                <NavLink to="/tarot/history" className={({ isActive }) => `block ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Lịch Sử</NavLink>
                            </>
                        )}
                    </div>
                    <div className="pt-4 pb-3 border-t border-slate-700">
                        {user ? (
                            <div className="px-5">
                                <div className="text-base font-medium text-purple-200 mb-1">{user.name || user.email}</div>
                                <button
                                    onClick={handleLogout}
                                    className="mt-1 w-full text-left block bg-pink-600 hover:bg-pink-700 text-white px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Đăng Xuất
                                </button>
                            </div>
                        ) : (
                            <div className="px-5 space-y-2">
                                <Link to="/login" className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                                    Đăng Nhập
                                </Link>
                                <Link to="/register" className="block w-full text-center bg-transparent hover:bg-pink-500 text-pink-400 hover:text-white border border-pink-400 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                                    Đăng Ký
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;

// ... existing code ...