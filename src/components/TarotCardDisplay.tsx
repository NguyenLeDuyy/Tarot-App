import React from 'react';
import type { TarotCard } from '../data/tarotDeck'; // Đảm bảo import type TarotCard

interface TarotCardDisplayProps {
    card: TarotCard | null; // Cho phép null nếu vị trí đó chưa có lá bài (dù ở trang kết quả thì thường là có)
    positionName?: string;   // Tên vị trí lá bài, ví dụ: "Quá khứ", "Lá 1"
    className?: string;      // Cho phép truyền thêm class tùy chỉnh
    showName?: boolean;      // Có hiển thị tên lá bài hay không
}

const TarotCardDisplay: React.FC<TarotCardDisplayProps> = ({ card, positionName, className = '', showName = true }) => {
    if (!card) {
        // Có thể hiển thị một placeholder nếu card là null, hoặc không render gì cả
        return (
            <div className={`aspect-[2/3] bg-slate-700/30 border-2 border-purple-500/30 border-dashed rounded-lg flex items-center justify-center p-2 ${className}`}>
                <span className="text-purple-400 text-sm">Vị trí trống</span>
            </div>
        );
    }

    return (
        <div className={`relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl border-2 border-purple-600/50 group ${className}`}>
            <img
                src={card.image || '/src/assets/images/cards/placeholder-card-back.png'} // Fallback nếu không có image
                alt={card.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {showName && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center">
                    <p className="text-white text-xs sm:text-sm font-semibold truncate" title={card.name}>
                        {card.name}
                    </p>
                </div>
            )}
            {positionName && (
                <div className="absolute top-1 left-1 bg-purple-500/80 text-white text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-semibold shadow-md">
                    {positionName}
                </div>
            )}
        </div>
    );
};

export default TarotCardDisplay; 