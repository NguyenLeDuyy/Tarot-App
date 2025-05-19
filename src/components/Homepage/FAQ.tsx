import React, { useState } from 'react';
// Optional: Import icons for expand/collapse, e.g., FaChevronDown, FaChevronUp
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQItemProps {
    question: string;
    answer: React.ReactNode; // Answer can be simple string or JSX for more complex content
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-purple-700/30">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-5 sm:py-6 text-left text-lg sm:text-xl font-semibold text-purple-200 hover:text-pink-300 transition-colors duration-300 focus:outline-none"
            >
                <span>{question}</span>
                {/* Replace with icons if preferred */}
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    {/* <FaChevronDown /> */}
                    ▼
                </span>
            </button>
            {isOpen && (
                <div className="pb-5 sm:pb-6 pr-4 text-gray-400 leading-relaxed animate-fadeIn">
                    {answer}
                </div>
            )}
        </div>
    );
};

// Define your FAQ data
const faqData: FAQItemProps[] = [
    {
        question: "AI luận giải Tarot này có đáng tin không?",
        answer: (
            <>
                <p className="mb-2">Hệ thống AI của Tarot Horizon được phát triển dựa trên các mô hình ngôn ngữ lớn và được huấn luyện với một kho tàng kiến thức sâu rộng về Tarot, bao gồm ý nghĩa truyền thống của từng lá bài, các kiểu trải bài phổ biến và các phương pháp luận giải đa dạng.</p>
                <p className="mb-2">Mục tiêu của AI là cung cấp một góc nhìn khách quan, logic và dựa trên dữ liệu để bạn tham khảo. AI không thay thế trực giác cá nhân hay lời khuyên từ chuyên gia, mà đóng vai trò như một người bạn đồng hành, giúp bạn khám phá các khía cạnh và tiềm năng khác nhau của một vấn đề.</p>
                <p>Chúng tôi khuyến khích bạn sử dụng luận giải từ AI như một nguồn thông tin để suy ngẫm và tự đưa ra quyết định cuối cùng cho mình.</p>
            </>
        )
    },
    {
        question: "Xem bài Tarot có phải là mê tín không?",
        answer: (
            <>
                <p className="mb-2">Quan niệm về Tarot rất đa dạng. Nhiều người xem Tarot không phải là một hình thức "bói toán" theo nghĩa tiên tri tương lai một cách cố định, mà là một công cụ tâm lý và chiêm nghiệm mạnh mẽ. Các lá bài Tarot với hình ảnh biểu tượng phong phú có thể kích thích trực giác, giúp chúng ta khám phá những suy nghĩ, cảm xúc tiềm ẩn và nhìn nhận vấn đề từ nhiều góc độ.</p>
                <p>Tại Tarot Horizon, chúng tôi tiếp cận Tarot như một phương tiện để tự khám phá, phát triển bản thân và tìm kiếm sự thông thái bên trong. Việc luận giải giúp bạn nhận diện các khuôn mẫu, cơ hội và thách thức, từ đó đưa ra những lựa chọn sáng suốt hơn.</p>
            </>
        )
    },
    {
        question: "Dữ liệu cá nhân của tôi có được bảo mật không?",
        answer: (
            <>
                <p className="mb-2">Chúng tôi cam kết bảo vệ sự riêng tư và bảo mật dữ liệu cá nhân của bạn. Mọi thông tin bạn cung cấp, bao gồm câu hỏi và các trải bài, đều được xử lý một cách cẩn trọng.</p>
                <p className="mb-2">Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba nào mà không có sự đồng ý rõ ràng của bạn, trừ khi được yêu cầu bởi pháp luật. Bạn có thể đọc thêm chi tiết trong Chính Sách Bảo Mật của chúng tôi.</p>
                <p>Các câu hỏi và trải bài của bạn có thể được sử dụng ẩn danh để cải thiện chất lượng của hệ thống AI, nhưng sẽ không bao giờ được liên kết với danh tính cá nhân của bạn.</p>
            </>
        )
    },
    {
        question: "Tôi có cần kiến thức về Tarot để sử dụng website không?",
        answer: "Hoàn toàn không! Website được thiết kế thân thiện cho cả người mới bắt đầu. Bạn chỉ cần chọn trải bài, đặt câu hỏi (nếu muốn), và AI sẽ cung cấp luận giải chi tiết. Chúng tôi cũng có mục 'Kiến thức Tarot' để bạn tìm hiểu thêm nếu quan tâm."
    },
    {
        question: "Kết quả luận giải có luôn chính xác 100% không?",
        answer: "Tarot và AI luận giải cung cấp những góc nhìn, khả năng và lời khuyên dựa trên các biểu tượng và câu hỏi của bạn. Chúng không phải là những dự đoán tương lai không thể thay đổi. Hãy xem đây là nguồn thông tin để bạn tham khảo, chiêm nghiệm và tự đưa ra quyết định tốt nhất cho cuộc sống của mình."
    }
];


const FAQ: React.FC = () => (
    <section className="py-16 sm:py-24 bg-[#160F2A] relative z-10"> {/* Slightly different darker background */}
        <div className="container mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500 drop-shadow-lg">
                Các Câu Hỏi Thường Gặp
            </h2>
            <div className="max-w-3xl mx-auto">
                {faqData.map((item, index) => (
                    <FAQItem key={index} question={item.question} answer={item.answer} />
                ))}
            </div>
        </div>
    </section>
);

export default FAQ;
