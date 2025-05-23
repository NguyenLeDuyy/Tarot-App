import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import type { TarotCard } from '../data/tarotDeck';
import TarotCardDisplay from '../components/TarotCardDisplay';
import { useAuth } from '../contexts/AuthContext';

// Interface này nên khớp với interface DisplayableDrawnCard từ TarotReadingPage.tsx
// hoặc bạn có thể import nó nếu đã export từ đó.
interface DisplayableDrawnCard extends TarotCard {
    isReversed: boolean;
}

// Giả sử đây là cấu trúc state được truyền từ TarotReadingPage
interface ReadingResultLocationState {
    question: string;
    drawnCards: DisplayableDrawnCard[];
    spreadName: string;
    spreadLayout?: string[]; // Tên các vị trí lá bài
    interpretation: string; // Phần luận giải từ AI (sẽ được thay thế bằng dữ liệu thật)
}

const ReadingResultPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as ReadingResultLocationState | null;
    const [saveStatus, setSaveStatus] = useState<string>('');
    const { user } = useAuth();

    if (!state || !state.drawnCards || state.drawnCards.length === 0) {
        // Nếu không có state hoặc không có lá bài, chuyển hướng về trang chọn spread
        // Hoặc hiển thị thông báo lỗi
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-gray-300 px-4">
                <h2 className="text-2xl font-semibold mb-4">Không tìm thấy kết quả trải bài.</h2>
                <p className="mb-6 text-center">Có vẻ như đã có lỗi xảy ra hoặc bạn chưa hoàn thành lượt trải bài.</p>
                <button
                    onClick={() => navigate('/tarot/select-spread')}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md"
                >
                    Chọn Lại Trải Bài
                </button>
            </div>
        );
    }

    const { question, drawnCards, spreadName, spreadLayout, interpretation } = state;

    const saveReading = async () => {
        if (!user) {
            // Prompt user to login
            setSaveStatus('Vui lòng đăng nhập để lưu kết quả');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/tarot/save-reading', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    question,
                    drawnCards: drawnCards.map(card => ({
                        name: card.name,
                        isReversed: card.isReversed,
                        id: card.id
                    })),
                    spreadName,
                    spreadLayout,
                    interpretation
                })
            });

            const data = await response.json();
            if (response.ok) {
                setSaveStatus('Đã lưu thành công vào lịch sử');
            } else {
                setSaveStatus(`Lỗi: ${data.message}`);
            }
        } catch (error) {
            setSaveStatus('Không thể kết nối đến máy chủ');
        }
    };

    return (
        <div className="py-10 sm:py-16 px-4 bg-gradient-to-br from-[#110C21] via-[#1A112C] to-[#24143D] min-h-[calc(100vh-150px)] text-gray-200">
            <div className="container mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        Kết Quả Luận Giải Tarot
                    </h1>
                    <p className="text-lg text-purple-300">{spreadName}</p>
                </div>

                {/* Câu hỏi của người dùng */}
                {question && (
                    <div className="mb-8 p-6 bg-slate-800/70 backdrop-blur-md rounded-xl shadow-lg border border-purple-600/40">
                        <h2 className="text-xl font-semibold text-purple-300 mb-2 font-['Cinzel',_serif]">Câu hỏi của bạn:</h2>
                        <p className="text-gray-300 text-lg italic">"{question}"</p>
                    </div>
                )}

                {/* Các lá bài đã rút */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-center text-purple-300 mb-6 font-['Cinzel',_serif]">Các Lá Bài Đã Rút:</h2>
                    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-center justify-items-center ${drawnCards.length >= 7 ? 'lg:grid-cols-4 xl:grid-cols-5' : ''} ${drawnCards.length === 1 ? 'max-w-xs mx-auto' : ''}`}>
                        {drawnCards.map((card, index) => (
                            <TarotCardDisplay
                                key={card.id || index}
                                card={card}
                                positionName={spreadLayout ? spreadLayout[index] : `Lá ${index + 1}`}
                                className="w-full"
                                isReversed={card.isReversed}
                            />
                        ))}
                    </div>
                </div>

                {/* Phần hiển thị ý nghĩa từng lá (tóm tắt) */}
                <div className="mb-10 p-6 sm:p-8 bg-slate-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-purple-600/40">
                    <h2 className="text-2xl font-semibold text-purple-300 mb-4 font-['Cinzel',_serif]">Tóm Tắt Ý Nghĩa Từng Lá:</h2>
                    <div className="space-y-4">
                        {drawnCards.map((card, index) => (
                            <div key={`summary-${card.id || index}`} className="p-3 bg-slate-900/50 rounded-md">
                                <h4 className="font-semibold text-purple-300">
                                    {card.name} {card.isReversed ? '(Ngược)' : '(Xuôi)'}
                                    {spreadLayout && spreadLayout[index] && ` - ${spreadLayout[index]}`}
                                </h4>
                                <p className="text-sm text-gray-400">{card.isReversed ? card.reversedMeaning : card.uprightMeaning}</p>
                                {(card.isReversed ? card.keywordsReversed : card.keywordsUpright) && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Keywords: {(card.isReversed ? card.keywordsReversed : card.keywordsUpright)?.join(', ')}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Phần luận giải từ AI */}
                <div className="mb-10 p-6 sm:p-8 bg-slate-800/70 backdrop-blur-md rounded-xl shadow-2xl border border-purple-600/50">
                    <h2 className="text-2xl font-semibold text-purple-300 mb-4 font-['Cinzel',_serif]">Luận Giải Chi Tiết Từ AI:</h2>
                    {interpretation ? (
                        <div
                            className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-4"
                        // Giả sử 'interpretation' là một string dài, có thể chứa các dấu xuống dòng '\n'
                        >
                            {interpretation.split('\n').map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">Không có luận giải từ AI hoặc đã xảy ra lỗi.</p>
                    )}
                </div>

                <div className="flex flex-col items-center justify-center">
                    <div className="text-center">
                        <Link
                            to="/tarot/select-spread"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Thực Hiện Trải Bài Khác
                        </Link>
                    </div>

                    {user && (
                        <button
                            onClick={saveReading}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-16 py-2.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Lưu Vào Lịch Sử
                        </button>
                    )}
                </div>

                {saveStatus && (
                    <p className="mt-4 text-center text-sm">{saveStatus}</p>
                )}
            </div>
        </div>
    );
};

export default ReadingResultPage; 