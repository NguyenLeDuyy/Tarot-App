import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import TarotCardDisplay from '../components/TarotCardDisplay';
import type { TarotCard } from '../data/tarotDeck';
import { fullTarotDeck as tarotData } from '../data/tarotDeck';

const ReadingDetailPage: React.FC = () => {
    const [reading, setReading] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { readingId } = useParams<{ readingId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchReadingDetail();
    }, [readingId]);

    const fetchReadingDetail = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/tarot/reading/${readingId}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Không thể tải thông tin chi tiết lần bói.' }));
                throw new Error(errorData.message || `Lỗi ${response.status}`);
            }
            const data = await response.json();
            setReading(data);
        } catch (err: any) {
            console.error("Lỗi khi tải chi tiết lần bói:", err);
            setError(err.message || 'Đã có lỗi xảy ra khi tải dữ liệu.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[calc(100vh-150px)] text-purple-300">
            <svg className="animate-spin h-8 w-8 text-purple-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang tải chi tiết lần bói...
        </div>
    );
    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-red-400 px-4">
            <h2 className="text-2xl font-semibold mb-4">Lỗi Tải Dữ Liệu</h2>
            <p className="mb-6 text-center">{error}</p>
            <button
                onClick={() => navigate('/tarot/history')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md"
            >
                Quay Lại Lịch Sử
            </button>
        </div>
    );
    if (!reading) return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-gray-300 px-4">
            <h2 className="text-2xl font-semibold mb-4">Không tìm thấy lần bói.</h2>
            <p className="mb-6 text-center">Lần bói bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <button
                onClick={() => navigate('/tarot/history')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md"
            >
                Quay Lại Lịch Sử
            </button>
        </div>
    );

    return (
        <div className="py-10 sm:py-16 px-4 bg-gradient-to-br from-[#110C21] via-[#1A112C] to-[#24143D] min-h-[calc(100vh-150px)] text-gray-200">
            <div className="container mx-auto">
                <button
                    onClick={() => navigate('/tarot/history')}
                    className="mb-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                    &larr; Quay Lại Lịch Sử
                </button>

                <div className="mb-10 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        Chi Tiết Lần Bói
                    </h1>
                    <p className="text-lg text-purple-300">{reading.spreadName}</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Ngày bói: {new Date(reading.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>

                {/* Câu hỏi của người dùng */}
                {reading.question && (
                    <div className="mb-8 p-6 bg-slate-800/70 backdrop-blur-md rounded-xl shadow-lg border border-purple-700/30">
                        <h2 className="text-xl font-semibold text-purple-300 mb-2 font-['Cinzel',_serif]">Câu hỏi của bạn:</h2>
                        <p className="text-gray-300 text-lg italic">"{reading.question}"</p>
                    </div>
                )}

                {/* Các lá bài đã rút */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-center text-purple-300 mb-6 font-['Cinzel',_serif]">Các Lá Bài Đã Rút:</h2>
                    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-center justify-items-center ${reading.drawnCards.length >= 7 ? 'lg:grid-cols-4 xl:grid-cols-5' : ''} ${reading.drawnCards.length === 1 ? 'max-w-xs mx-auto' : ''}`}>
                        {reading.drawnCards.map((cardInHistory: any, index: number) => {
                            const defaultCardData: TarotCard = {
                                id: cardInHistory.id || `unknown-${index}`,
                                name: cardInHistory.name || 'Unknown Card',
                                image: '/src/assets/images/cards/placeholder-card-back.png',
                                uprightMeaning: 'Meaning not found.',
                                reversedMeaning: 'Meaning not found.',
                            };
                            const fullCardData = tarotData.find((c: TarotCard) => c.name === cardInHistory.name) || defaultCardData;

                            return (
                                <TarotCardDisplay
                                    key={cardInHistory.id || index}
                                    card={{
                                        ...fullCardData,
                                        isReversed: cardInHistory.isReversed,
                                    }}
                                    positionName={reading.spreadLayout && reading.spreadLayout[index] ? reading.spreadLayout[index] : `Lá ${index + 1}`}
                                    className="w-full"
                                    isReversed={cardInHistory.isReversed}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Phần hiển thị ý nghĩa từng lá (tóm tắt) */}
                <div className="mb-10 p-6 sm:p-8 bg-slate-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-purple-600/40">
                    <h2 className="text-2xl font-semibold text-purple-300 mb-4 font-['Cinzel',_serif]">Tóm Tắt Ý Nghĩa Từng Lá:</h2>
                    <div className="space-y-4">
                        {reading.drawnCards.map((cardInHistory: any, index: number) => {
                            const defaultCardData: TarotCard = {
                                id: cardInHistory.id || `summary-unknown-${index}`,
                                name: cardInHistory.name || 'Unknown Card',
                                image: '',
                                uprightMeaning: 'Ý nghĩa xuôi không tìm thấy.',
                                reversedMeaning: 'Ý nghĩa ngược không tìm thấy.',
                                keywordsUpright: [],
                                keywordsReversed: [],
                            };
                            const cardDetails = tarotData.find(c => c.name === cardInHistory.name) || defaultCardData;
                            const isReversed = cardInHistory.isReversed;
                            const meaning = isReversed ? cardDetails.reversedMeaning : cardDetails.uprightMeaning;
                            const keywords = isReversed ? (cardDetails.keywordsReversed || []) : (cardDetails.keywordsUpright || []);

                            return (
                                <div key={`summary-${cardInHistory.id || index}`} className="p-3 bg-slate-900/50 rounded-md">
                                    <h4 className="font-semibold text-purple-300">
                                        {cardDetails.name} {isReversed ? '(Ngược)' : '(Xuôi)'}
                                        {reading.spreadLayout && reading.spreadLayout[index] && ` - ${reading.spreadLayout[index]}`}
                                    </h4>
                                    <p className="text-sm text-gray-400">{meaning}</p>
                                    {keywords.length > 0 && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Keywords: {keywords.join(', ')}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Phần luận giải từ AI */}
                {reading.interpretation && (
                    <div className="mb-10 p-6 sm:p-8 bg-slate-800/70 backdrop-blur-md rounded-xl shadow-2xl border border-purple-600/50">
                        <h2 className="text-2xl font-semibold text-purple-300 mb-4 font-['Cinzel',_serif]">Luận Giải Chi Tiết:</h2>
                        <div
                            className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-4"
                        >
                            {reading.interpretation.split('\n').map((paragraph: string, idx: number) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link
                        to="/tarot/select-spread"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Thực Hiện Trải Bài Khác
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ReadingDetailPage;
