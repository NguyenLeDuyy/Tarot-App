import React from 'react';
import { Link } from 'react-router-dom';

interface CardHighlightProps {
    name: string;
    imageSrc: string; // Path to card image
    keywords: string; // Keywords or brief meaning
    linkToCardPage?: string; // Optional link to a detailed page for that card
}

// Dummy data for featured cards - replace with real data and images
const featuredCardsData: CardHighlightProps[] = [
    {
        name: "The Fool",
        imageSrc: "src/assets/images/cards/the-fool.png", // Example path
        keywords: "Khởi đầu mới, niềm tin, sự ngây thơ, tiềm năng không giới hạn.",
        linkToCardPage: "/tarot-wiki/the-fool" // Example link
    },
    {
        name: "The Magician",
        imageSrc: "src/assets/images/cards/the-magician.png", // Example path
        keywords: "Sức mạnh ý chí, kỹ năng, sáng tạo, hiện thực hóa ý tưởng.",
        linkToCardPage: "/tarot-wiki/the-magician"
    },
    {
        name: "The Lovers",
        imageSrc: "src/assets/images/cards/the-lovers.png", // Example path
        keywords: "Tình yêu, mối quan hệ, sự lựa chọn, sự hòa hợp, giá trị cá nhân.",
        linkToCardPage: "/tarot-wiki/the-lovers"
    },
    {
        name: "Death", // Note: Death card is often misunderstood
        imageSrc: "src/assets/images/cards/death.png", // Example path
        keywords: "Sự kết thúc, chuyển đổi, buông bỏ, tái sinh, thay đổi lớn.",
        linkToCardPage: "/tarot-wiki/death"
    }
];

const CardHighlight: React.FC<CardHighlightProps> = ({ name, imageSrc, keywords, linkToCardPage }) => (
    <div className="bg-slate-800/60 backdrop-blur-md rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/50 border border-indigo-700/30">
        <img src={imageSrc} alt={name} className="w-full h-60 object-contain p-2 bg-slate-900/30" /> {/* object-contain to show full card */}
        <div className="p-5 text-center">
            <h4 className="text-xl font-bold font-['Cinzel',_serif] text-indigo-300 mb-2">{name}</h4>
            <p className="text-gray-400 text-sm mb-4 h-16 overflow-hidden">{keywords}</p>
            {linkToCardPage && (
                <Link to={linkToCardPage}>
                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                        Tìm Hiểu Thêm
                    </button>
                </Link>
            )}
        </div>
    </div>
);


const TarotBasics: React.FC = () => (
    <section className="py-16 sm:py-24 bg-slate-900/70 relative z-10">
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-500 drop-shadow-lg mb-6">
                    Khám Phá Thế Giới Tarot
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-4">
                    Tarot là một bộ bài gồm 78 lá, mỗi lá mang những hình ảnh, biểu tượng và ý nghĩa riêng, được sử dụng như một công cụ để chiêm nghiệm, khám phá bản thân và tìm kiếm sự dẫn lối. Nguồn gốc của Tarot vẫn còn nhiều tranh luận, nhưng nó đã phát triển qua nhiều thế kỷ, trở thành một hệ thống biểu tượng phong phú phản ánh hành trình cuộc sống của con người.
                </p>
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                    Tarot không "bói" tương lai một cách cố định, mà giúp bạn nhìn nhận rõ hơn về hiện tại, những tiềm năng, thách thức và đưa ra những lựa chọn sáng suốt hơn.
                </p>
            </div>

            <h3 className="text-3xl font-semibold text-center mb-10 font-['Cinzel',_serif] text-indigo-300">
                Một Vài Lá Bài Nổi Bật
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredCardsData.map((card) => (
                    <CardHighlight
                        key={card.name}
                        name={card.name}
                        imageSrc={card.imageSrc}
                        keywords={card.keywords}
                        linkToCardPage={card.linkToCardPage}
                    />
                ))}
            </div>

            <div className="text-center mt-12 sm:mt-16">
                <Link to="/tarot-wiki"> {/* Link to a more comprehensive Tarot guide/wiki page */}
                    <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold px-10 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg">
                        Khám Phá Toàn Bộ 78 Lá Bài
                    </button>
                </Link>
            </div>
        </div>
    </section>
);

export default TarotBasics;
