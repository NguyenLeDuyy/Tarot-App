import React from 'react';
import { Link } from 'react-router-dom';
// Optional: Import icons for each spread type from react-icons
// import { GiMagicSwirl, GiCrossMark, GiHeartWings } from 'react-icons/gi';

interface SpreadType {
    id: string; // Sẽ được dùng làm param trong URL
    name: string;
    description: string;
    image?: string; // Đường dẫn đến hình ảnh minh họa cho kiểu trải bài (tùy chọn)
    // icon?: React.ReactElement; // Tùy chọn icon
    cardCount: number; // Số lượng lá bài cho kiểu trải này
}

// Danh sách các kiểu trải bài. Bạn có thể mở rộng danh sách này.
const spreadTypes: SpreadType[] = [
    {
        id: 'three-card',
        name: 'Trải Bài 3 Lá',
        description: 'Khám phá Quá khứ - Hiện tại - Tương lai hoặc các khía cạnh khác của một vấn đề một cách nhanh chóng.',
        image: '/src/assets/images/spreads/three-card-spread-icon.png', // Ví dụ đường dẫn ảnh
        // icon: <GiMagicSwirl />,
        cardCount: 3,
    },
    {
        id: 'celtic-cross',
        name: 'Trải Bài Celtic Cross',
        description: 'Một cái nhìn tổng quan, sâu sắc và chi tiết về một tình huống phức tạp với 10 lá bài.',
        image: '/src/assets/images/spreads/celtic-cross-icon.png', // Ví dụ đường dẫn ảnh
        // icon: <GiCrossMark />,
        cardCount: 10,
    },
    {
        id: 'love-relationship',
        name: 'Trải Bài Tình Yêu',
        description: 'Làm sáng tỏ các vấn đề trong mối quan hệ tình cảm, tìm hiểu đối phương hoặc tiềm năng tình yêu mới.',
        image: '/src/assets/images/spreads/love-spread-icon.png', // Ví dụ đường dẫn ảnh
        // icon: <GiHeartWings />,
        cardCount: 5, // Ví dụ, bạn có thể định nghĩa số lá cụ thể
    },
    {
        id: 'career-path',
        name: 'Trải Bài Sự Nghiệp',
        description: 'Tìm kiếm định hướng, giải quyết các thách thức và khám phá cơ hội trong con đường sự nghiệp.',
        image: '/src/assets/images/spreads/career-spread-icon.png',
        cardCount: 4, // Ví dụ
    },
    // Thêm các kiểu trải bài khác nếu bạn muốn
];

const SelectSpreadPage: React.FC = () => {
    return (
        <div className="py-10 sm:py-16 px-4 bg-gradient-to-b from-[#1E1433] to-[#110C21] min-h-[calc(100vh-150px)]"> {/* Giả sử header + footer ~150px */}
            <div className="container mx-auto">
                <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-lg">
                    Chọn Kiểu Trải Bài Tarot
                </h1>
                <p className="text-center text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
                    Mỗi kiểu trải bài sẽ giúp bạn khám phá những khía cạnh khác nhau của cuộc sống. Hãy chọn một kiểu trải bài phù hợp với câu hỏi hoặc vấn đề bạn đang quan tâm.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {spreadTypes.map((spread) => (
                        <Link
                            key={spread.id}
                            to={`/tarot/reading/${spread.id}`} // Đường dẫn đến trang rút bài, truyền id của kiểu trải
                            className="block bg-slate-800/70 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8 border border-purple-700/30 transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 hover:border-purple-500"
                        >
                            {spread.image && ( // Hiển thị ảnh nếu có
                                <img
                                    src={spread.image}
                                    alt={spread.name}
                                    className="w-full h-40 object-contain rounded-lg mb-5 bg-slate-900/30 p-2"
                                />
                            )}
                            {/* {spread.icon && <div className="text-5xl text-pink-400 mb-4 mx-auto w-fit">{spread.icon}</div>} */}
                            <h2 className="text-2xl font-semibold font-['Cinzel',_serif] text-purple-300 mb-3 text-center">{spread.name}</h2>
                            <p className="text-gray-400 text-sm mb-4 text-center h-20 overflow-hidden">{spread.description}</p>
                            <div className="text-center mt-5">
                                <span className="inline-block bg-pink-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                    {spread.cardCount} lá bài
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectSpreadPage;
