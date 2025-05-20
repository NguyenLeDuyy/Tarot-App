import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fullTarotDeck } from '../../data/tarotDeck'; // Import full deck
import type { TarotCard } from '../../data/tarotDeck';   // Import TarotCard type
import SingleCardModal from '../Modal/SingleCardModal'; // Import the new modal

interface CardHighlightProps {
    card: TarotCard; // Pass the full card object
    onLearnMore: (card: TarotCard) => void; // Callback to open modal
}

// We'll fetch these from fullTarotDeck now
const featuredCardNamesForBasics = ["The Fool", "The Magician", "The Lovers", "Death"];

// <<<<<< ADD THIS MAPPING FOR CUSTOM IMAGES >>>>>>
const customBasicsCardImages: { [key: string]: string } = {
    "The Fool": "/src/assets/images/cards/the-fool.png",
    "The Magician": "/src/assets/images/cards/the-magician.png",
    "The Lovers": "/src/assets/images/cards/the-lovers.png",
    "Death": "/src/assets/images/cards/death.png",
};

const tarotBasicsFeaturedCards: TarotCard[] = fullTarotDeck
    .filter(card => featuredCardNamesForBasics.includes(card.name))
    .map(card => ({ // <<<<<< MODIFY HERE TO INCLUDE CUSTOM IMAGE IF AVAILABLE
        ...card,
        image: customBasicsCardImages[card.name] || card.image,
    }));


const CardHighlight: React.FC<CardHighlightProps> = ({ card, onLearnMore }) => (
    <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50 border border-indigo-700/30 flex flex-col">
        <img src={card.image} alt={card.name} className="w-full h-60 object-contain p-2 bg-slate-900/30" />
        <div className="p-5 text-center flex flex-col flex-grow">
            <h4 className="text-xl font-bold font-['Cinzel',_serif] text-indigo-300 mb-2">{card.name}</h4>
            <p className="text-gray-400 text-sm mb-4 h-16 overflow-hidden flex-grow">
                {/* Show a snippet of upright meaning or keywords */}
                {card.keywordsUpright ? card.keywordsUpright.slice(0, 3).join(', ') + "..." : card.uprightMeaning.substring(0, 70) + "..."}
            </p>
            <button
                onClick={() => onLearnMore(card)}
                className="mt-auto w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
                Tìm Hiểu Thêm
            </button>
        </div>
    </div>
);


const TarotBasics: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

    const handleOpenModal = (card: TarotCard) => {
        // When opening modal, we might want to show the original card image from the deck for consistency
        // or the custom one. For now, it will use the image property of the card object,
        // which is already updated if it's a featured card.
        // If you want the modal to *always* show the deck's original image, you'd need to fetch
        // the original card data again here.
        const originalCardData = fullTarotDeck.find(c => c.id === card.id) || card;
        setSelectedCard(originalCardData);
    };

    const handleCloseModal = () => {
        setSelectedCard(null);
    };

    return (
        <section className="py-16 sm:py-24 bg-slate-900/70 relative z-10">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-500 drop-shadow-lg mb-6">
                        Khám Phá Thế Giới Tarot
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-4">
                        Tarot là một bộ bài gồm 78 lá, mỗi lá mang những hình ảnh, biểu tượng và ý nghĩa riêng, được sử dụng như một công cụ để chiêm nghiệm, khám phá bản thân và tìm kiếm sự dẫn lối. Nguồn gốc của Tarot vẫn còn nhiều tranh luận, nhưng nó đã phát triển qua nhiều thế kỷ, trở thành một hệ thống biểu tượng phong phú phản ánh hành trình cuộc sống của con người.
                    </p>
                    <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                        Tarot không "bói" tương lai một cách cố định, mà giúp bạn nhìn nhận rõ hơn về hiện tại, những tiềm năng, thách thức và đưa ra những lựa chọn sáng suốt hơn.
                    </p>
                </div>

                <h3 className="text-3xl font-semibold text-center mb-10 font-['Cinzel',_serif] text-indigo-300">
                    Một Vài Lá Bài Nổi Bật
                </h3>
                {tarotBasicsFeaturedCards.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {tarotBasicsFeaturedCards.map((card) => (
                            <CardHighlight
                                key={card.id} // Use card.id for key
                                card={card} // card.image is now potentially the custom image
                                onLearnMore={handleOpenModal}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">Không thể tải thông tin các lá bài nổi bật.</p>
                )}


                <div className="text-center mt-12 sm:mt-16">
                    <Link to="/explore/all-cards">
                        <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold px-10 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg">
                            Khám Phá Toàn Bộ 78 Lá Bài
                        </button>
                    </Link>
                </div>
            </div>
            <SingleCardModal card={selectedCard} onClose={handleCloseModal} />
        </section>
    );
};

export default TarotBasics;
