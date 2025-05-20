// Path: tarot-app/src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
// Header và Footer đã được Layout xử lý
import FeaturedSpreads from '../components/Homepage/FeaturedSpreads';
import AIIntroduction from '../components/Homepage/AIIntroduction';
import HowToUse from '../components/Homepage/HowToUse';
import Testimonials from '../components/Homepage/Testimonials';
import TarotBasics from '../components/Homepage/TarotBasics';
import FeaturedCards from '../components/Homepage/FeaturedCards';
import FAQ from '../components/Homepage/FAQ';
import ContactForm from '../components/Homepage/ContactForm';

const AnimatedStars: React.FC = () => (
    <svg className="absolute inset-0 -z-10 h-full w-full" aria-hidden="true">
        <defs>
            <pattern
                id="hero-pattern"
                width="64"
                height="64"
                patternUnits="userSpaceOnUse"
                patternTransform="translate(0)"
            >
                <path d="M0 32a1 1 0 001 1h.01a1 1 0 000-2H1a1 1 0 00-1 1zm31.01 0a1 1 0 001 1h.01a1 1 0 000-2H32.01a1 1 0 00-1 1zM15.51 0a1 1 0 001 1h.01a1 1 0 000-2H16.51a1 1 0 00-1 1zm32 0a1 1 0 001 1h.01a1 1 0 000-2H48.51a1 1 0 00-1 1zM0 63a1 1 0 001 1h.01a1 1 0 000-2H1a1 1 0 00-1 1zm31.01 0a1 1 0 001 1h.01a1 1 0 000-2H32.01a1 1 0 00-1 1zM15.51 32a1 1 0 001 1h.01a1 1 0 000-2H16.51a1 1 0 00-1 1zm32 0a1 1 0 001 1h.01a1 1 0 000-2H48.51a1 1 0 00-1 1z" fill="#4C1D95" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-pattern)" />
    </svg>
);

const Home: React.FC = () => (
    <div className="relative min-h-screen bg-gradient-to-br from-[#110C21] via-[#1A112C] to-[#24143D] text-gray-200 overflow-x-hidden">
        <AnimatedStars />

        <main className="relative z-10 pt-20 pb-16 sm:pt-28 sm:pb-24">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-['Cinzel',_serif] mb-6">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
                        Khám Phá Bí Ẩn Tarot
                    </span>
                </h1>
                <p className="text-lg sm:text-xl text-purple-200 max-w-2xl mx-auto mb-10 leading-relaxed font-['Lato',_sans-serif]">
                    Chào mừng bạn đến với thế giới huyền bí của Tarot. Hãy đặt câu hỏi, chọn một trải bài, và để những lá bài dẫn lối, hé lộ những hiểu biết sâu sắc về cuộc sống, tình yêu và sự nghiệp của bạn với sự trợ giúp từ AI thông thái của chúng tôi.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
                    <Link
                        to="/tarot/select-spread"
                        className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        Bắt Đầu Trải Bài
                    </Link>
                    <Link
                        to="/explore/all-cards"
                        className="inline-block bg-transparent border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white px-10 py-3.5 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Khám Phá Toàn Bộ 78 Lá Bài
                    </Link>
                </div>
            </div>
        </main>

        <FeaturedSpreads />
        <AIIntroduction />
        <TarotBasics />
        <HowToUse />
        <Testimonials />
        <FAQ />
        <ContactForm />
    </div>
);

export default Home;