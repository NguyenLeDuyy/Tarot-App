import React from 'react';
// Optional: Import an icon for quotes, e.g., FaQuoteLeft from react-icons
// import { FaQuoteLeft, FaStar, FaRegStar } from 'react-icons/fa';

interface Testimonial {
    id: number;
    name: string;
    avatar?: string; // Optional: path to user's avatar image
    stars: number; // Number of stars (0-5)
    quote: string;
    role?: string; // e.g., "Người dùng Tarot Horizon"
}

// Dummy data - replace with real data or fetch from backend later
const testimonialsData: Testimonial[] = [
    {
        id: 1,
        name: "Minh Anh",
        avatar: "src/assets/images/avatars/avatar1.png", // Example path
        stars: 5,
        quote: "Thật bất ngờ với độ chính xác của AI! Luận giải rất chi tiết và sâu sắc, giúp mình nhìn rõ hơn về định hướng sắp tới. Chắc chắn sẽ quay lại!",
        role: "Content Creator"
    },
    {
        id: 2,
        name: "Hoàng Long",
        // avatar: "src/assets/images/avatars/avatar2.png", // Example path if no avatar, can use a default
        stars: 4,
        quote: "Giao diện đẹp, dễ sử dụng. Phần luận giải AI khá logic và đưa ra nhiều gợi ý hữu ích. Rất tiện lợi khi cần một lời khuyên nhanh.",
        role: "Nhà Đầu Tư"
    },
    {
        id: 3,
        name: "Thảo Nhi",
        avatar: "src/assets/images/avatars/avatar3.png", // Example path
        stars: 5,
        quote: "Mình đã thử nhiều trang Tarot online, nhưng Tarot Horizon với AI thực sự khác biệt. Luận giải không chung chung mà rất cá nhân hóa. Highly recommend!",
        role: "Sinh Viên"
    },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const totalStars = 5;
    return (
        <div className="flex items-center">
            {[...Array(totalStars)].map((_, index) => {
                // If using react-icons:
                // return index < rating ? <FaStar key={index} className="text-yellow-400" /> : <FaRegStar key={index} className="text-yellow-400" />;
                // Basic star (you can use actual star characters or SVG)
                return (
                    <span key={index} className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                        ★
                    </span>
                );
            })}
        </div>
    );
};


const TestimonialCard: React.FC<Testimonial> = ({ name, avatar, stars, quote, role }) => (
    <div className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-2xl p-6 sm:p-8 border border-purple-700/40 transform transition-all duration-300 hover:shadow-purple-500/50 hover:-translate-y-1">
        <div className="flex items-center mb-4">
            {avatar ? (
                <img src={avatar} alt={name} className="w-14 h-14 rounded-full mr-4 border-2 border-purple-500 object-cover" />
            ) : (
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-xl font-semibold mr-4 border-2 border-purple-500">
                    {name.charAt(0)}
                </div>
            )}
            <div>
                <h4 className="text-lg font-semibold text-purple-300 font-['Cinzel',_serif]">{name}</h4>
                {role && <p className="text-xs text-gray-500">{role}</p>}
            </div>
        </div>
        <div className="mb-3">
            <StarRating rating={stars} />
        </div>
        {/* Optional: Quote icon
        <FaQuoteLeft className="text-purple-500 text-2xl opacity-50 mb-2" /> 
        */}
        <p className="text-gray-300 leading-relaxed italic">"{quote}"</p>
    </div>
);

const Testimonials: React.FC = () => (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#1E1433] to-[#18122B] relative z-10">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 drop-shadow-lg">
                Người Dùng Nói Gì Về Chúng Tôi?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {testimonialsData.map((testimonial) => (
                    <TestimonialCard key={testimonial.id} {...testimonial} />
                ))}
            </div>
            {/* Optional: Button to see more testimonials or leave feedback */}
            {/* 
            <div className="text-center mt-12">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    Xem Thêm Đánh Giá
                </button>
            </div>
            */}
        </div>
    </section>
);

export default Testimonials;
