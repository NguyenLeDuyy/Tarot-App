import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Home: React.FC = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#18122B] via-[#2D1B4A] to-[#3E206D] text-white font-sans relative overflow-hidden">
        {/* Hiệu ứng ngôi sao nền */}
        <div className="absolute inset-0 pointer-events-none z-0">
            {/* Bạn có thể thêm SVG hoặc hình nền ngôi sao ở đây */}
            <img
                src="src\assets\bg\Home.png"
                alt="Tarot background"
                className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#18122B] opacity-80"></div>
        </div>

        {/* Header */}
        <Header />


        {/* Nội dung chính */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
            <div className="bg-[#2D1B4A]/80 rounded-2xl shadow-2xl p-10 max-w-3xl w-full text-center border border-purple-500 backdrop-blur-md">
                <h1 className="text-4xl font-extrabold mb-4 text-purple-200 drop-shadow-lg">Chào mừng đến với Tarot AI!</h1>
                <p className="text-lg mb-8 text-purple-100">
                    Khám phá trải bài Tarot, đặt câu hỏi và nhận luận giải từ AI.<br />
                    Trải nghiệm không gian huyền bí, hiện đại và đầy cảm hứng!
                </p>
                <div className="flex gap-6 justify-center">
                    <Link to="/tarot">
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200">
                            Xem Tarot ngay
                        </button>
                    </Link>
                    <Link to="/guide">
                        <button className="bg-purple-400 hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200">
                            Hướng dẫn sử dụng
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    </div>
);

export default Home;
