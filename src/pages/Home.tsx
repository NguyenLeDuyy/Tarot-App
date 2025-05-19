// Path: tarot-app/src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FeaturedSpreads from '../components/Homepage/FeaturedSpreads';
import AIIntroduction from '../components/Homepage/AIIntroduction';
import HowToUse from '../components/Homepage/HowToUse';
import Testimonials from '../components/Homepage/Testimonials';
import TarotBasics from '../components/Homepage/TarotBasics';
import FAQ from '../components/Homepage/FAQ';
import ContactForm from '../components/Homepage/ContactForm';
import Footer from '../components/Footer';

const Home: React.FC = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#18122B] via-[#2D1B4A] to-[#3E206D] text-white font-sans relative overflow-hidden">
        <div className="flex flex-col min-h-screen">
            {/* Hiệu ứng ngôi sao nền */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <img
                    src="src/assets/bg/Home.png" // Đảm bảo đường dẫn này đúng
                    alt="Tarot background"
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#18122B] opacity-80"></div>
            </div>

            {/* Header */}
            <Header />

            {/* Phần nội dung chính của trang sẽ phát triển ở đây */}
            <div className="flex-grow">
                {/* Nội dung chính - Hero Section */}
                <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
                    <div className="bg-[#2D1B4A]/80 rounded-2xl shadow-2xl p-10 max-w-3xl w-full border border-purple-500 backdrop-blur-md">
                        <img
                            src="src/assets/bg/logo.png" // Đường dẫn đến logo của bạn
                            alt="Tarot Horizon Logo"
                            className="mx-auto h-16 sm:h-20 w-auto mb-6 drop-shadow-lg"
                        />
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-purple-200 drop-shadow-lg font-['Cinzel',_serif]">
                            Chào Mừng Đến Với Tarot Horizon
                        </h1>
                        <p className="text-lg sm:text-xl mb-8 text-purple-100">
                            Khám phá vận mệnh, giải mã bí ẩn và tìm kiếm sự dẫn lối từ những lá bài Tarot huyền bí.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                            <Link to="/tarot/select-spread">
                                <button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    Bắt Đầu Trải Bài
                                </button>
                            </Link>
                            <Link to="/guide">
                                <button className="w-full sm:w-auto bg-purple-400/70 backdrop-blur-sm border border-purple-500 hover:bg-purple-600/80 text-white px-8 py-3.5 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    Tìm Hiểu Thêm
                                </button>
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Section Các Kiểu Trải Bài Nổi Bật */}
                <FeaturedSpreads />

                {/* Section Giới Thiệu AI Tarot */}
                <AIIntroduction />

                {/* Section Hướng Dẫn Sử Dụng */}
                <HowToUse />

                {/* Section Đánh Giá Từ Người Dùng */}
                <Testimonials />

                {/* Section Kiến Thức Tarot Cơ Bản */}
                <TarotBasics />

                {/* Section FAQ */}
                <FAQ />

                {/* Section Liên Hệ & Phản Hồi */}
                <ContactForm />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    </div>
);

export default Home;