import React from 'react';
import { Link } from 'react-router-dom';
// Bạn có thể tìm một icon phù hợp, ví dụ từ react-icons
// import { FaBrain, FaRobot } from 'react-icons/fa';

const AIIntroduction: React.FC = () => (
    <section className="py-16 sm:py-24 bg-slate-900/50 relative z-10"> {/* Nền tối hơn một chút để phân biệt */}
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
                {/* Icon (tùy chọn) */}
                {/* <FaBrain className="text-5xl sm:text-6xl text-purple-400 mx-auto mb-6" /> */}
                <h2 className="text-4xl sm:text-5xl font-bold mb-8 font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 drop-shadow-lg">
                    Khám Phá Tarot Qua Lăng Kính AI
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed">
                    Tarot Horizon mang đến trải nghiệm luận giải bài Tarot độc đáo với sự hỗ trợ của Trí Tuệ Nhân Tạo (AI) tiên tiến. Hệ thống AI của chúng tôi được xây dựng dựa trên các mô hình ngôn ngữ lớn, kết hợp với kho tàng kiến thức Tarot phong phú, nhằm cung cấp những phân tích chính xác, mạch lạc và sâu sắc, dành riêng cho bạn.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 items-start">
                <div className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8 border border-purple-700/30 transform transition-all duration-300 hover:shadow-teal-500/40">
                    <h3 className="text-2xl font-semibold font-['Cinzel',_serif] text-teal-300 mb-4">
                        Tại Sao Chọn Luận Giải Bằng AI?
                    </h3>
                    <ul className="space-y-3 text-gray-400">
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-teal-400 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span><strong>Nhanh Chóng & Tức Thì:</strong> Nhận luận giải chi tiết ngay lập tức, không cần chờ đợi.</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-teal-400 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span><strong>Luôn Sẵn Sàng 24/7:</strong> Giải đáp thắc mắc của bạn bất cứ lúc nào, tại bất cứ đâu.</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-teal-400 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span><strong>Riêng Tư & An Toàn:</strong> Thoải mái khám phá những câu hỏi cá nhân trong không gian bảo mật.</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="w-5 h-5 text-teal-400 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            <span><strong>Góc Nhìn Khách Quan:</strong> Phân tích dựa trên dữ liệu và biểu tượng, mang đến cách nhìn mới mẻ, đa chiều.</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8 border border-purple-700/30 flex flex-col items-center justify-center text-center transform transition-all duration-300 hover:shadow-teal-500/40">
                    {/* <FaRobot className="text-6xl text-cyan-400 mb-6" /> */}
                    <img src="src/assets/images/ai-tarot-concept.png" alt="AI Tarot Concept" className="w-48 h-auto mb-6 opacity-80" /> {/* Thay bằng hình ảnh phù hợp */}
                    <h3 className="text-2xl font-semibold font-['Cinzel',_serif] text-cyan-300 mb-3">
                        Sẵn Sàng Trải Nghiệm?
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Hãy để AI đồng hành cùng bạn trên hành trình khám phá bản thân và giải mã những thông điệp từ vũ trụ.
                    </p>
                    <Link to="/tarot/select-spread">
                        <button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                            Thử Luận Giải Với AI Ngay
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
);

export default AIIntroduction;
