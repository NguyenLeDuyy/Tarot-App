import React from 'react';
import type { TarotCard } from '../../data/tarotDeck';

interface SingleCardModalProps {
    card: TarotCard | null; // Can be null if no card is selected
    onClose: () => void;
}

const SingleCardModal: React.FC<SingleCardModalProps> = ({ card, onClose }) => {
    if (!card) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-[60] p-4 sm:p-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-purple-600/50">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-['Cinzel',_serif]">
                        {card.name}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-purple-300 hover:text-pink-400 transition-colors text-3xl"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>
                <div className="flex flex-col items-center">
                    <img src={card.image} alt={card.name} className="w-2/3 sm:w-1/2 h-auto object-contain rounded-md mb-4 shadow-lg" />
                    <div className="text-gray-300 space-y-3 text-sm w-full">
                        <p>
                            <strong className="text-purple-300">Ý nghĩa xuôi:</strong> {card.uprightMeaning}
                        </p>
                        <p>
                            <strong className="text-purple-300">Ý nghĩa ngược:</strong> {card.reversedMeaning}
                        </p>
                        {card.keywordsUpright && card.keywordsUpright.length > 0 && (
                            <p><strong className="text-purple-300">Từ khóa xuôi:</strong> {card.keywordsUpright.join(', ')}</p>
                        )}
                        {card.keywordsReversed && card.keywordsReversed.length > 0 && (
                            <p><strong className="text-purple-300">Từ khóa ngược:</strong> {card.keywordsReversed.join(', ')}</p>
                        )}
                    </div>
                </div>
                <div className="text-center mt-6">
                    <button
                        onClick={onClose}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleCardModal;
