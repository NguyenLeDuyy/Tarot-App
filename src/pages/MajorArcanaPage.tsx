import React from 'react';
import { Link } from 'react-router-dom';
import { fullTarotDeck } from '../data/tarotDeck'; // Assuming fullTarotDeck contains all cards
import type { TarotCard } from '../data/tarotDeck';
import TarotCardDisplay from '../components/TarotCardDisplay'; // Re-use if suitable, or create a new one

// Helper to identify Major Arcana cards (adjust if your data structure is different)
const majorArcanaCards = fullTarotDeck.filter(
    card => card.id.startsWith('major-') || (card.id.length <= 3 && !isNaN(parseInt(card.id))) // A common way to ID major arcana if not explicitly typed
    // A better way would be: card.arcana === 'Major' if you add this field to TarotCard
);


const MajorArcanaPage: React.FC = () => {
    return (
        <div className="py-10 sm:py-16 px-4 bg-gradient-to-br from-[#110C21] via-[#1A112C] to-[#24143D] min-h-[calc(100vh-150px)] text-gray-200">
            <div className="container mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold font-['Cinzel',_serif] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        Khám Phá Ẩn Chính (Major Arcana)
                    </h1>
                    <p className="text-lg text-purple-300 max-w-3xl mx-auto font-['Lato',_sans-serif]">
                        22 lá bài Ẩn Chính đại diện cho các bài học cuộc sống lớn, các nguyên mẫu và những ảnh hưởng mang tính bước ngoặt trên hành trình của bạn.
                    </p>
                </div>

                {majorArcanaCards.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 justify-center">
                        {majorArcanaCards.map((card) => (
                            <div key={card.id} className="flex flex-col items-center group">
                                <TarotCardDisplay
                                    card={card}
                                    isReversed={false} // Default to upright for display, or add toggle
                                    className="w-full transition-transform duration-300 group-hover:scale-105"
                                />
                                <h3 className="mt-2 text-sm font-semibold text-purple-200 group-hover:text-pink-400 font-['Cinzel',_serif] text-center">
                                    {card.name}
                                </h3>
                                {/* Consider adding a Link to a detailed page for each card later */}
                                {/* <Link to={`/cards/${card.id}`} className="text-xs text-purple-400 hover:text-pink-300">Xem chi tiết</Link> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-xl text-gray-400">Không tìm thấy thông tin các lá Ẩn Chính.</p>
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

export default MajorArcanaPage; 