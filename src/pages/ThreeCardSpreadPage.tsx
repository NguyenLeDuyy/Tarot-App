import React from 'react';
import { Link } from 'react-router-dom';
import { spreadDefinitions } from '../data/spreadDefinitions';

const spreadInfo = spreadDefinitions['three-card'];

const ThreeCardSpreadPage: React.FC = () => {
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
                        <ul className="space-y-3 text-gray-300 font-['Lato',_sans-serif]">
                            <li><strong>1. Quá khứ:</strong> Những sự kiện, kinh nghiệm đã qua ảnh hưởng đến tình hình hiện tại.</li>
                            <li><strong>2. Hiện tại:</strong> Tình hình, thách thức hoặc bài học bạn đang đối mặt ngay bây giờ.</li>
                            <li><strong>3. Tương lai:</strong> Hướng đi tiềm năng, kết quả có thể xảy ra dựa trên tình hình hiện tại.</li>
                        </ul>
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

export default ThreeCardSpreadPage;