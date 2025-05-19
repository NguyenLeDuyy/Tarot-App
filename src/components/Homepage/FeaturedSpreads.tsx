import React from 'react';
import { Link } from 'react-router-dom';

// Giả sử bạn sẽ có các hình ảnh này trong thư mục public hoặc src/assets
const spreadImages = {
    threeCard: "src/assets/images/spreads/three-card-spread.png", // Đường dẫn ví dụ
    celticCross: "src/assets/images/spreads/celtic-cross-spread.png", // Đường dẫn ví dụ
    loveSpread: "src/assets/images/spreads/love-spread.png", // Đường dẫn ví dụ
};

interface SpreadCardProps {
    title: string;
    description: string;
    imageSrc: string;
    linkTo: string;
}

const SpreadCard: React.FC<SpreadCardProps> = ({ title, description, imageSrc, linkTo }) => (
    <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 border border-purple-700/30">
        <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h3 className="text-2xl font-bold font-['Cinzel',_serif] text-purple-300 mb-2">{title}</h3>
            <p className="text-gray-400 text-sm mb-4 h-12 overflow-hidden">{description}</p>
            <Link to={linkTo}>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                    Xem Trải Bài
                </button>
            </Link>
        </div>
    </div>
);

const FeaturedSpreads: React.FC = () => {
    const spreads = [
        {
            title: "Trải Bài 3 Lá",
            description: "Khám phá quá khứ, hiểu rõ hiện tại và hé mở những khả năng của tương lai.",
            imageSrc: spreadImages.threeCard,
            linkTo: "/tarot/three-card", // Điều chỉnh link nếu cần
        },
        {
            title: "Celtic Cross",
            description: "Một cái nhìn tổng quan và sâu sắc về mọi khía cạnh trong cuộc sống của bạn.",
            imageSrc: spreadImages.celticCross,
            linkTo: "/tarot/celtic-cross", // Điều chỉnh link nếu cần
        },
        {
            title: "Trải Bài Tình Yêu",
            description: "Lắng nghe những thông điệp vũ trụ về chuyện tình cảm, mối quan hệ của bạn.",
            imageSrc: spreadImages.loveSpread,
            linkTo: "/tarot/love", // Điều chỉnh link nếu cần
        },
        // Bạn có thể thêm các kiểu trải bài khác ở đây
    ];

    return (
        <section className="py-16 sm:py-24 px-4 relative z-10 bg-black/20"> {/* Thêm background nhẹ để nổi bật section */}
            <div className="container mx-auto">
                <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-lg">
                    Các Kiểu Trải Bài Nổi Bật
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {spreads.map((spread) => (
                        <SpreadCard
                            key={spread.title}
                            title={spread.title}
                            description={spread.description}
                            imageSrc={spread.imageSrc}
                            linkTo={spread.linkTo}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSpreads;