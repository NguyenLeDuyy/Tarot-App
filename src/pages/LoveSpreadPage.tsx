import React from 'react';
import { Link } from 'react-router-dom';
import { spreadDefinitions } from '../data/spreadDefinitions';

const spreadInfo = spreadDefinitions['love-relationship'];

const LoveSpreadPage: React.FC = () => {
    if (!spreadInfo) return <div className="text-center py-10">Thông tin trải bài không tồn tại.</div>;

    return (
        <div className="py-10 sm:py-16 px-4 bg-gradient-to-br from-[#110C21] via-[#1A112C] to-[#24143D] min-h-[calc(100vh-150px)] text-gray-200">
            <div className="container mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold font-['Cinzel',_serif] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        {spreadInfo.name}
                    </h1>
                    <p className="text-lg text-purple-300 max-w-3xl mx-auto font-['Lato',_sans-serif]">
                        {spreadInfo.description}
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-8 bg-slate-800/60 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-xl border border-purple-700/40">
                    <div>
                        <h2 className="text-2xl font-semibold font-['Cinzel',_serif] text-purple-300 mb-3">Mục Đích Trải Bài</h2>
                        <p className="text-gray-300 leading-relaxed font-['Lato',_sans-serif]">{spreadInfo.purpose}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold font-['Cinzel',_serif] text-purple-300 mb-3">Số Lượng Lá Bài</h2>
                        <p className="text-gray-300 leading-relaxed font-['Lato',_sans-serif]">{spreadInfo.cardCount} lá</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold font-['Cinzel',_serif] text-purple-300 mb-3">Ý Nghĩa Các Vị Trí</h2>
                        <ul className="space-y-2 text-gray-300 font-['Lato',_sans-serif]">
                            {spreadInfo.layout.map((position, index) => (
                                <li key={index}><strong>{position.startsWith((index + 1).toString()) ? position : `${index + 1}. ${position}`}:</strong> [Thêm mô tả chi tiết cho vị trí này nếu muốn]</li>
                            ))}
                        </ul>
                        <p className="text-sm text-gray-400 mt-2 font-['Lato',_sans-serif]">Ví dụ: Lá "Bạn trong mối quan hệ" thể hiện vai trò, cảm xúc của bạn...</p>
                    </div>

                    {spreadInfo.questions && spreadInfo.questions.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-semibold font-['Cinzel',_serif] text-purple-300 mb-3">Câu Hỏi Gợi Ý</h2>
                            <ul className="list-disc list-inside space-y-1 text-gray-300 font-['Lato',_sans-serif]">
                                {spreadInfo.questions.map((q, index) => (
                                    <li key={index}>{q}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="text-center pt-6">
                        <Link
                            to={`/tarot/reading/${spreadInfo.id}`}
                            className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Bắt Đầu {spreadInfo.name}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoveSpreadPage; 