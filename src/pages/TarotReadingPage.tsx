import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fullTarotDeck as tarotDeck } from '../data/tarotDeck'; // Sử dụng full deck cho dễ test
import type { TarotCard } from '../data/tarotDeck'; // <<<<<< CHANGE HERE

// Định nghĩa lại thông tin kiểu trải bài để biết số lượng lá cần rút
// Bạn có thể lấy thông tin này từ một nguồn chung nếu muốn
const spreadDetails: { [key: string]: { name: string; cardCount: number; layout?: string[] } } = {
    'three-card': { name: 'Trải Bài 3 Lá', cardCount: 3, layout: ['Quá khứ', 'Hiện tại', 'Tương lai'] },
    'celtic-cross': { name: 'Trải Bài Celtic Cross', cardCount: 10, layout: ['Hiện tại', 'Thách thức', 'Nền tảng', 'Quá khứ gần', 'Tiềm năng', 'Tương lai gần', 'Bạn', 'Môi trường', 'Hy vọng/Sợ hãi', 'Kết quả'] }, // Cần layout chi tiết hơn
    'love-relationship': { name: 'Trải Bài Tình Yêu', cardCount: 5, layout: ['Bạn', 'Đối phương', 'Tình trạng MQH', 'Thách thức', 'Kết quả tiềm năng'] },
    'career-path': { name: 'Trải Bài Sự Nghiệp', cardCount: 4, layout: ['Hiện trạng', 'Trở ngại', 'Cơ hội', 'Lời khuyên'] },
};

interface DisplayableDrawnCard extends TarotCard {
    isReversed: boolean;
}

const TarotReadingPage: React.FC = () => {
    const { spreadId } = useParams<{ spreadId: string }>();
    const navigate = useNavigate();

    const [question, setQuestion] = useState<string>('');
    const [drawnCards, setDrawnCards] = useState<DisplayableDrawnCard[]>([]);
    const [cardPlaceholders, setCardPlaceholders] = useState<null[]>([]);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [currentSpread, setCurrentSpread] = useState<{ name: string; cardCount: number; layout?: string[] } | null>(null);
    const [isLoadingInterpretation, setIsLoadingInterpretation] = useState<boolean>(false);
    const [errorInterpretation, setErrorInterpretation] = useState<string | null>(null);

    useEffect(() => {
        if (spreadId && spreadDetails[spreadId]) {
            const spread = spreadDetails[spreadId];
            setCurrentSpread(spread);
            setCardPlaceholders(Array(spread.cardCount).fill(null));
            setDrawnCards([]); // Reset cards khi spread thay đổi
            setErrorInterpretation(null);
            setIsLoadingInterpretation(false);
        } else {
            // Xử lý trường hợp spreadId không hợp lệ, ví dụ chuyển hướng về trang chọn spread
            navigate('/tarot/select-spread');
        }
    }, [spreadId, navigate]);

    const handleDrawCards = () => {
        if (!currentSpread || isDrawing) return;

        setIsDrawing(true);
        setErrorInterpretation(null);
        // Logic rút bài ngẫu nhiên không lặp lại
        const shuffledDeck = [...tarotDeck].sort(() => 0.5 - Math.random());
        const selectedWithOrientation = shuffledDeck.slice(0, currentSpread.cardCount).map(card => ({
            ...card,
            isReversed: Math.random() < 0.33 // Ví dụ: 33% cơ hội là lá ngược
        }));

        // Mô phỏng việc rút bài từ từ
        let cardsToShow: DisplayableDrawnCard[] = [];
        selectedWithOrientation.forEach((card, index) => {
            setTimeout(() => {
                cardsToShow = [...cardsToShow, card];
                // Cập nhật mảng drawnCards với các lá đã rút và giữ các placeholder cho các lá chưa rút
                setDrawnCards(prevDrawn => {
                    const newDrawn = [...prevDrawn];
                    newDrawn[index] = card;
                    return newDrawn;
                });

                if (index === selectedWithOrientation.length - 1) {
                    setIsDrawing(false);
                }
            }, (index + 1) * 500); // Hiển thị mỗi lá sau 0.5s
        });
    };

    const handleViewInterpretation = async () => {
        if (!currentSpread || drawnCards.length !== currentSpread.cardCount || isLoadingInterpretation) {
            return;
        }

        setIsLoadingInterpretation(true);
        setErrorInterpretation(null);

        try {
            const response = await fetch('http://localhost:5000/api/tarot/interpret', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: question,
                    drawnCards: drawnCards,
                    spreadName: currentSpread.name,
                    spreadLayout: currentSpread.layout,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Lỗi từ server: ${response.status}`);
            }

            const data = await response.json();

            navigate('/tarot/result', {
                state: {
                    question: question,
                    drawnCards: drawnCards,
                    spreadName: currentSpread.name,
                    spreadLayout: currentSpread.layout,
                    interpretation: data.interpretation,
                },
            });

        } catch (error: any) {
            console.error("Lỗi khi lấy luận giải từ AI:", error);
            setErrorInterpretation(error.message || "Không thể kết nối đến dịch vụ luận giải. Vui lòng thử lại.");
        } finally {
            setIsLoadingInterpretation(false);
        }
    };

    if (!currentSpread) {
        return <div className="text-center py-10">Đang tải thông tin trải bài...</div>;
    }

    return (
        <div className="py-10 sm:py-16 px-4 bg-gradient-to-b from-[#110C21] to-[#1E1433] min-h-[calc(100vh-150px)] text-gray-200">
            <div className="container mx-auto">
                <button
                    onClick={() => navigate('/tarot/select-spread')}
                    className="mb-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    disabled={isLoadingInterpretation || isDrawing}
                >
                    &larr; Chọn Kiểu Trải Bài Khác
                </button>

                <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3 font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    {currentSpread.name}
                </h1>
                <p className="text-center text-gray-400 mb-8">
                    Tập trung vào câu hỏi của bạn và để vũ trụ dẫn lối.
                </p>

                <div className="max-w-2xl mx-auto mb-10 p-6 bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg border border-purple-700/30">
                    <label htmlFor="userQuestion" className="block text-xl font-semibold mb-3 text-purple-300 font-['Cinzel',_serif]">
                        Câu hỏi của bạn:
                    </label>
                    <textarea
                        id="userQuestion"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ví dụ: Tôi nên làm gì để cải thiện mối quan hệ này? Hoặc để trống nếu chỉ muốn một thông điệp chung."
                        rows={3}
                        className="w-full p-3 bg-slate-900/80 border border-purple-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none placeholder-gray-500"
                        disabled={drawnCards.length > 0 && drawnCards.every(c => c !== null) || isLoadingInterpretation || isDrawing}
                    />
                </div>

                {/* Hiển thị các vị trí lá bài */}
                <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-center mb-10 ${currentSpread.cardCount === 10 ? 'lg:grid-cols-4 xl:grid-cols-5' : ''}`}>
                    {(drawnCards.length > 0 ? drawnCards : cardPlaceholders).map((card, index) => (
                        <div
                            key={index}
                            className="aspect-[2/3] bg-slate-700/50 border-2 border-purple-500/50 border-dashed rounded-lg flex flex-col items-center justify-center p-2 relative shadow-lg overflow-hidden"
                            title={currentSpread.layout ? currentSpread.layout[index] : `Vị trí ${index + 1}`}
                        >
                            {card ? (
                                <>
                                    <img
                                        src={card.image || '/src/assets/images/cards/placeholder-card-back.png'}
                                        alt={card.name}
                                        className="w-full h-full object-contain rounded-md transition-opacity duration-500 opacity-0 animate-fadeIn"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                        onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                                    />
                                    <div className="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-xs p-1 rounded-b-md text-center truncate">
                                        {card.name}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center">
                                    {/* <div className="text-4xl text-purple-400 mb-2">?</div> */}
                                    <p className="text-xs text-purple-300">{currentSpread.layout ? currentSpread.layout[index] : `Lá ${index + 1}`}</p>
                                </div>
                            )}
                            <div className="absolute top-1 right-1 bg-purple-600 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    {isLoadingInterpretation && (
                        <div className="my-4 text-pink-400">
                            <svg className="animate-spin h-8 w-8 text-pink-400 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang lấy luận giải từ AI, vui lòng chờ...
                        </div>
                    )}
                    {errorInterpretation && (
                        <p className="text-red-400 text-sm mt-3 mb-3">{errorInterpretation}</p>
                    )}

                    {drawnCards.length > 0 && drawnCards.every(c => c !== null) && !isLoadingInterpretation ? (
                        <button
                            onClick={handleViewInterpretation}
                            disabled={isLoadingInterpretation}
                            className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white px-10 py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Xem Luận Giải
                        </button>
                    ) : (
                        <button
                            onClick={handleDrawCards}
                            disabled={isDrawing || isLoadingInterpretation || (!question.trim() && currentSpread.cardCount > 1)}
                            className={`bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white px-10 py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${isDrawing || isLoadingInterpretation || (!question.trim() && currentSpread.cardCount > 1) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isDrawing ? 'Đang Rút Bài...' : 'Rút Bài'}
                        </button>
                    )}
                    {(!question.trim() && currentSpread.cardCount > 1 && !(drawnCards.length > 0 && drawnCards.every(c => c !== null)) && !isDrawing && !isLoadingInterpretation) && (
                        <p className="text-red-400 text-sm mt-3">Vui lòng nhập câu hỏi của bạn trước khi rút bài.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TarotReadingPage; 