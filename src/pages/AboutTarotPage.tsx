import React from 'react';
import { Link } from 'react-router-dom';

const AboutTarotPage: React.FC = () => {
    return (
        <div className="py-10 sm:py-16 px-4 bg-gradient-to-br from-[#110C21] via-[#1A112C] to-[#24143D] min-h-[calc(100vh-150px)] text-gray-200">
            <div className="container mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold font-['Cinzel',_serif] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        Về Tarot Huyền Bí
                    </h1>
                    <p className="text-lg text-purple-300 max-w-3xl mx-auto font-['Lato',_sans-serif]">
                        Khám phá lịch sử, ý nghĩa và nghệ thuật đọc bài Tarot.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Section 1: What is Tarot? */}
                    <section className="p-6 sm:p-8 bg-slate-800/60 backdrop-blur-md rounded-xl shadow-xl border border-purple-700/40">
                        <h2 className="text-2xl sm:text-3xl font-semibold font-['Cinzel',_serif] text-purple-300 mb-4">
                            Tarot là gì?
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-4 font-['Lato',_sans-serif]">
                            Tarot là một bộ bài gồm 78 lá, mỗi lá mang những hình ảnh, biểu tượng và câu chuyện riêng. Chúng được sử dụng như một công cụ để khám phá bản thân, tìm kiếm sự thông thái và nhận thức sâu sắc hơn về các khía cạnh của cuộc sống. Tarot không phải để dự đoán tương lai một cách cứng nhắc, mà là để cung cấp góc nhìn, phản ánh những năng lượng hiện tại và tiềm năng có thể xảy ra.
                        </p>
                        <p className="text-gray-300 leading-relaxed font-['Lato',_sans-serif]">
                            Bộ bài được chia thành hai phần chính: Ẩn Chính (Major Arcana) gồm 22 lá đại diện cho các bài học cuộc sống lớn và các sự kiện mang tính bước ngoặt, và Ẩn Phụ (Minor Arcana) gồm 56 lá phản ánh những trải nghiệm và quyết định hàng ngày.
                        </p>
                    </section>

                    {/* Section 2: A Brief History */}
                    <section className="p-6 sm:p-8 bg-slate-800/60 backdrop-blur-md rounded-xl shadow-xl border border-purple-700/40">
                        <h2 className="text-2xl sm:text-3xl font-semibold font-['Cinzel',_serif] text-purple-300 mb-4">
                            Lược Sử Tarot
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-4 font-['Lato',_sans-serif]">
                            Nguồn gốc của Tarot vẫn còn là một chủ đề được tranh luận, nhưng những bộ bài Tarot sớm nhất được biết đến xuất hiện ở Ý vào thế kỷ 15. Ban đầu, chúng được sử dụng cho các trò chơi bài gọi là "Tarocchi". Mãi cho đến thế kỷ 18 và 19, Tarot mới bắt đầu được liên kết rộng rãi với các mục đích bói toán và huyền học.
                        </p>
                        <p className="text-gray-300 leading-relaxed font-['Lato',_sans-serif]">
                            Nhiều nhà huyền học nổi tiếng đã đóng góp vào việc giải thích và phổ biến Tarot, tạo ra các bộ bài mang tính biểu tượng như Rider-Waite-Smith, Thoth Tarot, và Marseille Tarot, mỗi bộ mang một phong cách nghệ thuật và hệ thống biểu tượng độc đáo.
                        </p>
                    </section>

                    {/* Section 3: How Tarot Reading Works on Our Site */}
                    <section className="p-6 sm:p-8 bg-slate-800/60 backdrop-blur-md rounded-xl shadow-xl border border-purple-700/40">
                        <h2 className="text-2xl sm:text-3xl font-semibold font-['Cinzel',_serif] text-purple-300 mb-4">
                            Trải Bài Tarot Với AI Hoạt Động Như Thế Nào?
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-4 font-['Lato',_sans-serif]">
                            Trên trang web của chúng tôi, bạn có thể trải nghiệm việc đọc bài Tarot một cách hiện đại và tiện lợi. Sau khi bạn đặt câu hỏi (hoặc chọn đọc thông điệp chung) và chọn một kiểu trải bài, hệ thống sẽ rút ngẫu nhiên các lá bài cho bạn.
                        </p>
                        <p className="text-gray-300 leading-relaxed mb-4 font-['Lato',_sans-serif]">
                            Sau đó, trí tuệ nhân tạo (AI) của chúng tôi, được huấn luyện dựa trên kiến thức sâu rộng về ý nghĩa các lá bài, biểu tượng học và các phương pháp luận giải truyền thống, sẽ phân tích các lá bài trong bối cảnh câu hỏi và vị trí của chúng trong trải bài. AI sẽ cung cấp một bài luận giải chi tiết, giúp bạn hiểu rõ hơn về thông điệp mà các lá bài muốn truyền tải.
                        </p>
                        <p className="text-gray-300 leading-relaxed font-['Lato',_sans-serif]">
                            Hãy nhớ rằng AI chỉ là một công cụ hỗ trợ. Trực giác và sự chiêm nghiệm cá nhân của bạn vẫn là yếu tố quan trọng nhất trong việc tìm thấy ý nghĩa từ trải bài.
                        </p>
                    </section>

                    <div className="text-center pt-8">
                        <Link
                            to="/tarot/select-spread"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Sẵn Sàng Trải Bài?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutTarotPage; 