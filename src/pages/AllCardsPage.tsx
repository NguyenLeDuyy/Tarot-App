import React from 'react';
import { Link } from 'react-router-dom';
import { fullTarotDeck } from '../data/tarotDeck';
import TarotCardDisplay from '../components/TarotCardDisplay';

const AllCardsPage: React.FC = () => {
    return (
        <div className="py-10 sm:py-16 px-4 bg-gradient-to-br from-[#110C21] via-[#1A112C] to-[#24143D] min-h-[calc(100vh-150px)] text-gray-200">
            <div className="container mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold font-['Cinzel',_serif] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        Khám Phá Toàn Bộ 78 Lá Bài Tarot
                    </h1>
                    <p className="text-lg text-purple-300 max-w-3xl mx-auto font-['Lato',_sans-serif]">
                        Duyệt qua toàn bộ bộ bài Tarot, từ những lá Ẩn Chính đầy ý nghĩa đến những câu chuyện đời thường của Ẩn Phụ.
                    </p>
                </div>

                {fullTarotDeck.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 sm:gap-6 justify-center">
                        {fullTarotDeck.map((card) => (
                            <div key={card.id} className="flex flex-col items-center group">
                                <TarotCardDisplay
                                    card={card}
                                    isReversed={false} // Default to upright for display
                                    className="w-full transition-transform duration-300 group-hover:scale-105"
                                />
                                <h3 className="mt-2 text-xs sm:text-sm font-semibold text-purple-200 group-hover:text-pink-400 font-['Cinzel',_serif] text-center truncate w-full px-1">
                                    {card.name}
                                </h3>
                                {/* 
                                <Link 
                                    to={`/cards/${card.id}`} // Placeholder for individual card detail page
                                    className="text-xs text-purple-400 hover:text-pink-300 mt-1"
                                >
                                    Xem chi tiết
                                </Link> 
                                */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-xl text-gray-400">Không tìm thấy thông tin bộ bài Tarot.</p>
                )}
                <div className="text-center mt-16">
                    <Link
                        to="/tarot/select-spread"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Thực Hiện Trải Bài
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AllCardsPage; 