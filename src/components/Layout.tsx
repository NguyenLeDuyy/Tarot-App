import React from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#18122B] via-[#2D1B4A] to-[#3E206D] text-white font-sans relative overflow-hidden">
            {/* Hiệu ứng nền chung, có thể di chuyển từ Home.tsx ra đây nếu muốn áp dụng cho mọi trang */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <img
                    src="/src/assets/bg/Home.png" // Đường dẫn
                    alt="Tarot background"
                    className="w-full h-full object-cover opacity-20" // Giảm opacity hơn cho layout chung
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#18122B] opacity-60"></div>
            </div>

            <Header />
            <main className="flex-grow relative z-10"> {/* main sẽ nằm giữa Header và Footer */}
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
