import React, { useState } from 'react';
import { fullTarotDeck } from '../../data/tarotDeck'; // Đảm bảo đường dẫn đúng
import type { TarotCard } from '../../data/tarotDeck'; // <<<<<< CHANGE THIS LINE

// Lấy thông tin cho 4 lá bài cụ thể
const featuredCardNames = ["The Fool", "The Magician", "The High Priestess", "The Empress"];
const featuredCardsData = fullTarotDeck.filter(card => featuredCardNames.includes(card.name));

const FeaturedCardsModal: React.FC<{ cards: TarotCard[]; onClose: () => void }> = ({ cards, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-[60] p-4 sm:p-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-600/50">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-['Cinzel',_serif]">
                        Những Lá Bài Nổi Bật
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-purple-300 hover:text-pink-400 transition-colors text-3xl"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {cards.map((card) => (
                        <div key={card.id} className="bg-slate-700/50 p-4 rounded-lg shadow-lg border border-purple-500/30">
                            <img src={card.image} alt={card.name} className="w-full h-auto object-contain rounded-md mb-3 aspect-[2/3]" />
                            <h4 className="text-lg font-semibold text-pink-400 mb-1 text-center font-['Cinzel',_serif]">{card.name}</h4>
                            <div className="text-xs text-gray-300 space-y-2">
                                <p><strong>Xuôi:</strong> {card.uprightMeaning.substring(0, 100)}...</p>
                                <p><strong>Ngược:</strong> {card.reversedMeaning.substring(0, 100)}...</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <button
                        onClick={onClose}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};


const FeaturedCards: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-16 sm:py-24 bg-[#160f29] relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-transparent to-pink-900/20 opacity-50 -z-0"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold font-['Cinzel',_serif] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    Một Vài Lá Bài Nổi Bật
                </h2>
                <p className="text-lg text-purple-200 max-w-2xl mx-auto mb-10 font-['Lato',_sans-serif]">
                    Khám phá ý nghĩa sâu sắc của một số lá bài Tarot tiêu biểu, những biểu tượng mang trong mình thông điệp và trí tuệ cổ xưa.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 max-w-3xl mx-auto">
                    {featuredCardsData.slice(0, 4).map(card => ( // Hiển thị 4 lá đầu tiên làm preview
                        <div key={`preview-${card.id}`} className="flex flex-col items-center p-3 bg-slate-800/50 rounded-lg shadow-lg border border-purple-600/30 hover:shadow-purple-500/30 transition-shadow">
                            <img src={card.image} alt={card.name} className="w-20 h-auto sm:w-24 rounded-md mb-2 aspect-[2/3]" />
                            <p className="text-sm font-semibold text-purple-300 font-['Cinzel',_serif]">{card.name}</p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                    Tìm Hiểu Thêm Về Các Lá Bài Này
                </button>
            </div>
            {isModalOpen && <FeaturedCardsModal cards={featuredCardsData} onClose={() => setIsModalOpen(false)} />}
        </section>
    );
};

export default FeaturedCards;
