import React from 'react';
import { Link } from 'react-router-dom';

const AboutProjectPage: React.FC = () => {
    return (
        <div className="py-10 sm:py-16 px-4 bg-gradient-to-br from-[#110C21] via-[#1A112C] to-[#24143D] min-h-[calc(100vh-150px)] text-gray-200">
            <div className="container mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold font-['Cinzel',_serif] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        Chào Mừng Đến Với Tarot Horizon
                    </h1>
                    <p className="text-lg text-purple-300 max-w-3xl mx-auto font-['Lato',_sans-serif]">
                        Nơi công nghệ gặp gỡ huyền học để soi sáng hành trình của bạn.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Section 1: Our Mission */}
                    <section className="p-6 sm:p-8 bg-slate-800/60 backdrop-blur-md rounded-xl shadow-xl border border-purple-700/40">
                        <h2 className="text-2xl sm:text-3xl font-semibold font-['Cinzel',_serif] text-purple-300 mb-4">
                            Sứ Mệnh Của Chúng Tôi
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-4 font-['Lato',_sans-serif]">
                            Tại Tarot Horizon, chúng tôi tin rằng sự thông thái cổ xưa của Tarot có thể được làm phong phú và dễ tiếp cận hơn thông qua sức mạnh của công nghệ hiện đại. Sứ mệnh của chúng tôi là tạo ra một không gian trực tuyến, nơi bạn có thể khám phá những hiểu biết sâu sắc từ Tarot một cách trực quan, cá nhân hóa và đầy ý nghĩa.
                        </p>
                        <p className="text-gray-300 leading-relaxed font-['Lato',_sans-serif]">
                            Chúng tôi mong muốn kết nối bạn với trí tuệ của những lá bài, giúp bạn tự vấn, tìm kiếm định hướng và khai mở tiềm năng bên trong mình, tất cả được hỗ trợ bởi công nghệ AI tiên tiến.
                        </p>
                    </section>

                    {/* Section 2: Features */}
                    <section className="p-6 sm:p-8 bg-slate-800/60 backdrop-blur-md rounded-xl shadow-xl border border-purple-700/40">
                        <h2 className="text-2xl sm:text-3xl font-semibold font-['Cinzel',_serif] text-purple-300 mb-4">
                            Tính Năng Nổi Bật
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 font-['Lato',_sans-serif]">
                            <li><strong>Trải Bài Đa Dạng:</strong> Chọn từ nhiều kiểu trải bài Tarot phổ biến để phù hợp với câu hỏi và nhu cầu của bạn.</li>
                            <li><strong>Luận Giải Bằng AI:</strong> Nhận những bài luận giải chi tiết, sâu sắc được tạo ra bởi AI thông minh, dựa trên ý nghĩa truyền thống và bối cảnh trải bài của bạn.</li>
                            <li><strong>Lưu Trữ Lịch Sử:</strong> Đăng nhập để lưu lại các lần trải bài, theo dõi hành trình khám phá bản thân của bạn.</li>
                            <li><strong>Giao Diện Thân Thiện:</strong> Trải nghiệm người dùng mượt mà, trực quan trên cả máy tính và thiết bị di động.</li>
                            <li><strong>Thông Tin Phong Phú:</strong> Tìm hiểu thêm về ý nghĩa của từng lá bài và các khái niệm cơ bản của Tarot.</li>
                        </ul>
                    </section>

                    {/* Section 3: The Technology */}
                    <section className="p-6 sm:p-8 bg-slate-800/60 backdrop-blur-md rounded-xl shadow-xl border border-purple-700/40">
                        <h2 className="text-2xl sm:text-3xl font-semibold font-['Cinzel',_serif] text-purple-300 mb-4">
                            Đằng Sau Công Nghệ
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-4 font-['Lato',_sans-serif]">
                            "Tarot Horizon" sử dụng các mô hình ngôn ngữ lớn (LLMs) tiên tiến để cung cấp các bài luận giải. AI của chúng tôi được huấn luyện với một kho tàng kiến thức về Tarot, bao gồm ý nghĩa truyền thống, các cách giải thích hiện đại, và tâm lý học biểu tượng. Điều này cho phép AI không chỉ đưa ra thông tin mà còn tạo ra những diễn giải có chiều sâu, phù hợp với từng tình huống cụ thể.
                        </p>
                        <p className="text-gray-300 leading-relaxed font-['Lato',_sans-serif]">
                            Chúng tôi cam kết phát triển công nghệ một cách có trách nhiệm, tôn trọng tính huyền bí và cá nhân của trải nghiệm Tarot.
                        </p>
                    </section>

                    <div className="text-center pt-8">
                        <Link
                            to="/tarot/select-spread"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Khám Phá Tarot Ngay
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutProjectPage; 