import React from 'react';
// Optional: Import icons from react-icons if you want to use them
// import { FaRegListAlt, FaQuestionCircle, FaRobot, FaMagic } from 'react-icons/fa';

interface StepProps {
    stepNumber: string;
    title: string;
    description: string;
    // icon?: React.ReactElement; // Uncomment if using icons
}

const StepCard: React.FC<StepProps> = ({ stepNumber, title, description /*, icon*/ }) => (
    <div className="flex items-start p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-purple-700/20 transform transition-all duration-300 hover:border-pink-500/50 hover:shadow-pink-500/30">
        {/* {icon && <div className="text-3xl text-pink-400 mr-5 mt-1">{icon}</div>} */}
        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-md mr-5 font-['Cinzel',_serif]">
            {stepNumber}
        </div>
        <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-pink-300 mb-2 font-['Cinzel',_serif]">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
    </div>
);

const HowToUse: React.FC = () => {
    const steps = [
        {
            stepNumber: "1",
            title: "Chọn Kiểu Trải Bài",
            description: "Khám phá thư viện trải bài đa dạng của chúng tôi, từ trải 3 lá nhanh gọn đến Celtic Cross sâu sắc. Lựa chọn trải bài phù hợp với câu hỏi hoặc lĩnh vực bạn quan tâm.",
            // icon: <FaRegListAlt />,
        },
        {
            stepNumber: "2",
            title: "Đặt Câu Hỏi (Nếu Có)",
            description: "Bạn có thể nhập câu hỏi cụ thể hoặc vấn đề bạn đang trăn trở để AI tập trung phân tích. Nếu không, AI vẫn sẽ đưa ra luận giải tổng quan dựa trên trải bài bạn chọn.",
            // icon: <FaQuestionCircle />,
        },
        {
            stepNumber: "3",
            title: "Nhận Luận Giải AI",
            description: "Sau khi xác nhận, hệ thống AI thông minh của chúng tôi sẽ phân tích các lá bài và cung cấp một bản luận giải chi tiết, sâu sắc và cá nhân hóa chỉ trong vài giây.",
            // icon: <FaRobot />,
        },
        {
            stepNumber: "4",
            title: "Suy Ngẫm & Khám Phá",
            description: "Đọc kỹ luận giải, suy ngẫm về những thông điệp và lời khuyên. Sử dụng những hiểu biết này để định hướng và đưa ra quyết định tốt hơn cho cuộc sống của bạn.",
            // icon: <FaMagic />,
        },
    ];

    return (
        <section className="py-16 sm:py-24 bg-[#1E1433] relative z-10"> {/* Slightly different background for section separation */}
            <div className="container mx-auto px-4">
                <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 drop-shadow-lg">
                    Bắt Đầu Hành Trình Tarot Của Bạn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-4xl mx-auto">
                    {steps.map((step) => (
                        <StepCard
                            key={step.stepNumber}
                            stepNumber={step.stepNumber}
                            title={step.title}
                            description={step.description}
                        // icon={step.icon} // Uncomment if using icons
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowToUse;
