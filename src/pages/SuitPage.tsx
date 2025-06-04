import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fullTarotDeck } from '../data/tarotDeck';
import type { TarotCard, Suit } from '../data/tarotDeck';
import SingleCardModal from '../components/Modal/SingleCardModal';

const suitDisplayNames: Record<Suit, string> = {
    "Wands": "Gậy (Wands)",
    "Cups": "Cốc (Cups)",
    "Swords": "Kiếm (Swords)",
    "Pentacles": "Tiền (Pentacles)"
};

const SuitPage: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
    const [suitCards, setSuitCards] = useState<TarotCard[]>([]);
    const { suitName } = useParams<{ suitName: string }>();
    const navigate = useNavigate();

    // Convert URL param (e.g., "wands") to the actual suit name ("Wands")
    const currentSuitKey = suitName?.toLowerCase() as keyof typeof suitDisplayNames | undefined;
    const capitalizedSuitName = currentSuitKey ? currentSuitKey.charAt(0).toUpperCase() + currentSuitKey.slice(1) as Suit : undefined;

    useEffect(() => {
        if (capitalizedSuitName) {
            const validSuits: Suit[] = ["Wands", "Cups", "Swords", "Pentacles"];
            if (validSuits.includes(capitalizedSuitName)) {
                const filteredCards = fullTarotDeck.filter(
                    card => card.suit === capitalizedSuitName && card.arcana === 'Minor Arcana'
                );
                setSuitCards(filteredCards);
            } else {
                navigate('/explore/all-cards');
            }
        } else {
            navigate('/explore/all-cards'); // Navigate if suitName is invalid from URL
        }
    }, [capitalizedSuitName, navigate, suitName]);

    const handleOpenModal = (card: TarotCard) => {
        setSelectedCard(card);
    };

    const handleCloseModal = () => {
        setSelectedCard(null);
    };

    const suitDescriptions: Record<Suit, string> = {
        Wands: "Bộ Gậy đại diện cho nguồn cảm hứng, năng lượng, sự nhiệt tình và tham vọng. Nó gắn liền với nguyên tố Lửa.",
        Cups: "Bộ Cốc giải quyết các vấn đề về cảm xúc, mối quan hệ, trực giác và sự sáng tạo. Nó gắn liền với nguyên tố Nước.",
        Swords: "Bộ Kiếm tượng trưng cho trí tuệ, logic, sự thật và những thách thức. Nó gắn liền với nguyên tố Khí.",
        Pentacles: "Bộ Tiền liên quan đến các khía cạnh vật chất của cuộc sống, như tài chính, sự nghiệp, sức khỏe và sự hiện thực hóa. Nó gắn liền với nguyên tố Đất.",
    };

    const pageTitle = capitalizedSuitName ? suitDisplayNames[capitalizedSuitName] : "Bộ Bài";
    const currentSuitDescription = capitalizedSuitName ? suitDescriptions[capitalizedSuitName] : "Khám phá các lá bài của bộ này.";

    if (!capitalizedSuitName) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[calc(100vh-150px)] text-purple-300">
                <p>Đang tải thông tin bộ bài hoặc bộ bài không hợp lệ...</p>
                <Link to="/explore/all-cards" className="mt-4 text-sky-400 hover:text-sky-300">Quay lại Tất Cả Lá Bài</Link>
            </div>
        );
    }

    return (
        <div className="py-10 sm:py-16 px-4 bg-gradient-to-br from-[#110C21] via-[#1A112C] to-[#24143D] min-h-[calc(100vh-150px)] text-gray-200">
            <div className="container mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-lg mb-4">
                        {pageTitle}
                    </h1>
                    <p className="text-lg text-purple-300 max-w-2xl mx-auto">
                        {currentSuitDescription}
                    </p>
                    <Link to="/explore/all-cards" className="inline-block mt-4 text-sky-400 hover:text-sky-300 transition-colors">
                        &larr; Quay Lại Tất Cả Lá Bài
                    </Link>
                </div>

                {suitCards.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 sm:gap-6">
                        {suitCards.map((card) => (
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
                    <p className="text-center text-gray-400 text-lg">Không tìm thấy lá bài nào cho {pageTitle}.</p>
                )}
            </div>
            <SingleCardModal card={selectedCard} onClose={handleCloseModal} />
        </div>
    );
};

export default SuitPage; 