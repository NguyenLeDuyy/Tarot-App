import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fullTarotDeck } from '../data/tarotDeck';
import type { TarotCard, Suit } from '../data/tarotDeck';
import SingleCardModal from '../components/Modal/SingleCardModal';

type CardFilter = 'all' | 'major' | Suit;

const AllCardsPage: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
    const [filter, setFilter] = useState<CardFilter>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpenModal = (card: TarotCard) => {
        setSelectedCard(card);
    };

    const handleCloseModal = () => {
        setSelectedCard(null);
    };

    const filteredCards = useMemo(() => {
        let cards = fullTarotDeck;
        if (filter === 'major') {
            cards = cards.filter(card => card.arcana === 'Major Arcana');
        } else if (filter !== 'all') {
            // Wands, Cups, Swords, Pentacles
            cards = cards.filter(card => card.suit === filter);
        }

        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            cards = cards.filter(card =>
                card.name.toLowerCase().includes(lowerSearchTerm) ||
                (card.keywordsUpright && card.keywordsUpright.join(' ').toLowerCase().includes(lowerSearchTerm)) ||
                (card.keywordsReversed && card.keywordsReversed.join(' ').toLowerCase().includes(lowerSearchTerm))
            );
        }
        return cards;
    }, [filter, searchTerm]);

    const filterButtonLabels: Record<CardFilter, string> = {
        all: 'Tất Cả Lá Bài',
        major: 'Bộ Ẩn Chính',
        Wands: 'Bộ Gậy (Wands)',
        Cups: 'Bộ Cốc (Cups)',
        Swords: 'Bộ Kiếm (Swords)',
        Pentacles: 'Bộ Tiền (Pentacles)',
    };

    const filterButtons: { label: string; value: CardFilter }[] = [
        { label: filterButtonLabels.all, value: 'all' },
        { label: filterButtonLabels.major, value: 'major' },
        { label: filterButtonLabels.Wands, value: 'Wands' },
        { label: filterButtonLabels.Cups, value: 'Cups' },
        { label: filterButtonLabels.Swords, value: 'Swords' },
        { label: filterButtonLabels.Pentacles, value: 'Pentacles' },
    ];

    return (
        <div className="py-10 sm:py-16 px-4 bg-gradient-to-br from-[#110C21] via-[#1A112C] to-[#24143D] min-h-screen text-gray-200">
            <div className="container mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-lg mb-4">
                        Khám Phá Toàn Bộ 78 Lá Bài Tarot
                    </h1>
                    <p className="text-lg text-purple-300 max-w-2xl mx-auto">
                        Khám phá sự thông thái và biểu tượng trong mỗi lá bài của bộ bài Tarot. Nhấp vào một lá bài để tìm hiểu thêm về ý nghĩa của nó.
                    </p>
                </div>

                {/* Filter and Search Controls */}
                <div className="mb-8 p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên hoặc từ khóa..."
                            className="w-full sm:flex-grow p-2.5 rounded-md bg-slate-700 text-gray-200 border border-slate-600 focus:ring-purple-500 focus:border-purple-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        {filterButtons.map(btn => (
                            <button
                                key={btn.value}
                                onClick={() => setFilter(btn.value)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                                            ${filter === btn.value
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                        : 'bg-slate-700 hover:bg-slate-600 text-purple-300 hover:text-purple-200'}`}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Navigation Links to specific sections */}
                <div className="mb-8 text-center flex flex-wrap justify-center gap-x-6 gap-y-3">
                    <Link to="/explore/major-arcana" className="text-sky-400 hover:text-sky-300 transition-colors">Xem Bộ Ẩn Chính</Link>
                    <Link to="/explore/minor-arcana/wands" className="text-sky-400 hover:text-sky-300 transition-colors">Bộ Gậy</Link>
                    <Link to="/explore/minor-arcana/cups" className="text-sky-400 hover:text-sky-300 transition-colors">Bộ Cốc</Link>
                    <Link to="/explore/minor-arcana/swords" className="text-sky-400 hover:text-sky-300 transition-colors">Bộ Kiếm</Link>
                    <Link to="/explore/minor-arcana/pentacles" className="text-sky-400 hover:text-sky-300 transition-colors">Bộ Tiền</Link>
                </div>


                {filteredCards.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                        {filteredCards.map((card) => (
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
                    <p className="text-center text-gray-400 text-lg py-10">
                        Không có lá bài nào phù hợp với bộ lọc hoặc từ khóa tìm kiếm của bạn.
                    </p>
                )}
            </div>
            <SingleCardModal card={selectedCard} onClose={handleCloseModal} />
        </div>
    );
};

export default AllCardsPage; 