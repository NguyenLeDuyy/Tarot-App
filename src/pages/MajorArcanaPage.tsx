import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fullTarotDeck } from '../data/tarotDeck'; // Assuming fullTarotDeck contains all cards
import type { TarotCard } from '../data/tarotDeck';
import SingleCardModal from '../components/Modal/SingleCardModal';

const MajorArcanaPage: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

    const majorArcanaCards = fullTarotDeck.filter(card => card.arcana === 'Major Arcana');

    const handleOpenModal = (card: TarotCard) => {
        setSelectedCard(card);
    };

    const handleCloseModal = () => {
        setSelectedCard(null);
    };

    return (
        <div className="py-10 sm:py-16 px-4 bg-gradient-to-br from-[#110C21] via-[#1A112C] to-[#24143D] min-h-[calc(100vh-150px)] text-gray-200">
            <div className="container mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-lg mb-4">
                        Bộ Ẩn Chính (Major Arcana)
                    </h1>
                    <p className="text-lg text-purple-300 max-w-2xl mx-auto">
                        22 lá bài Ẩn Chính đại diện cho những bài học nghiệp quả và tinh thần của cuộc sống. Chúng mô tả các sự kiện quan trọng trong đời, các nhân vật nguyên mẫu và hành trình của linh hồn hướng tới sự giác ngộ.
                    </p>
                    <Link to="/explore/all-cards" className="inline-block mt-4 text-sky-400 hover:text-sky-300 transition-colors">
                        &larr; Quay Lại Tất Cả Lá Bài
                    </Link>
                </div>

                {majorArcanaCards.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                        {majorArcanaCards.map((card) => (
                            <div
                                key={card.id}
                                className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/40 border border-purple-700/30 cursor-pointer group flex flex-col"
                                onClick={() => handleOpenModal(card)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => e.key === 'Enter' && handleOpenModal(card)}
                            >
                                <img
                                    src={card.image || '/src/assets/images/cards/placeholder-card-back.png'}
                                    alt={card.name}
                                    className="w-full h-48 sm:h-60 object-contain p-2 bg-slate-900/30 group-hover:opacity-90 transition-opacity"
                                />
                                <div className="p-3 text-center flex-grow flex flex-col justify-center">
                                    <h3 className="text-sm sm:text-base font-semibold font-['Cinzel',_serif] text-purple-300 group-hover:text-purple-200 transition-colors">
                                        {card.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400 text-lg">Không tìm thấy lá bài nào thuộc Bộ Ẩn Chính.</p>
                )}
            </div>
            <SingleCardModal card={selectedCard} onClose={handleCloseModal} />
        </div>
    );
};

export default MajorArcanaPage; 