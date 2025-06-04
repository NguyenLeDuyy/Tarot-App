import React from 'react';
import type { TarotCard } from '../../data/tarotDeck';

interface SingleCardModalProps {
    card: TarotCard | null; // Can be null if no card is selected
    onClose: () => void;
}

const SingleCardModal: React.FC<SingleCardModalProps> = ({ card, onClose }) => {
    if (!card) return null;

    // Default to a placeholder if image is somehow missing, though tarotDeck should provide it
    const imageUrl = card.image || '/src/assets/images/cards/placeholder-card-back.png';

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100] p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="bg-gradient-to-br from-slate-800 via-slate-900 to-purple-900/70 p-5 sm:p-6 md:p-8 rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto relative text-gray-200 border border-purple-700/50 custom-scrollbar"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-400 hover:text-purple-300 text-3xl font-light transition-colors duration-200"
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <h2 className="text-3xl sm:text-4xl font-bold font-['Cinzel',_serif] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4 sm:mb-6 text-center">
                    {card.name}
                </h2>

                <div className="flex flex-col md:flex-row gap-4 mb-6 items-center md:items-start">
                    <div className="w-2/3 sm:w-1/2 md:w-5/12 flex-shrink-0 mx-auto md:mx-0">
                        <img
                            src={imageUrl}
                            alt={card.name}
                            className="w-full h-auto object-contain rounded-lg shadow-lg border-2 border-purple-500/30"
                        />
                    </div>
                    <div className="md:w-7/12 text-center md:text-left">
                        {(card.keywordsUpright || card.keywordsReversed) && (
                            <div className="mb-3 bg-slate-700/50 p-3 rounded-md">
                                <h4 className="text-lg font-semibold text-purple-300 mb-1 font-['Cinzel',_serif]">Keywords</h4>
                                {card.keywordsUpright && card.keywordsUpright.length > 0 && (
                                    <p className="text-sm text-sky-300/90">
                                        <strong className="font-medium">Upright:</strong> {card.keywordsUpright.join(', ')}
                                    </p>
                                )}
                                {card.keywordsReversed && card.keywordsReversed.length > 0 && (
                                    <p className="text-sm text-pink-300/90 mt-1">
                                        <strong className="font-medium">Reversed:</strong> {card.keywordsReversed.join(', ')}
                                    </p>
                                )}
                            </div>
                        )}
                        {card.arcana && (
                            <p className="text-sm text-gray-400 mb-1"><strong className="text-gray-300">Arcana:</strong> {card.arcana}</p>
                        )}
                        {card.suit && (
                            <p className="text-sm text-gray-400 mb-1"><strong className="text-gray-300">Suit:</strong> {card.suit}</p>
                        )}
                        {/* You can add more quick info here: number, element, etc. */}
                    </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                    <div className="bg-slate-700/40 p-3 rounded-md">
                        <h4 className="text-md sm:text-lg font-semibold text-purple-300 mb-1 font-['Cinzel',_serif]">Meaning (Upright)</h4>
                        <p className="text-gray-300">{card.uprightMeaning}</p>
                    </div>

                    {card.reversedMeaning && (
                        <div className="bg-slate-700/40 p-3 rounded-md">
                            <h4 className="text-md sm:text-lg font-semibold text-purple-300 mb-1 font-['Cinzel',_serif]">Meaning (Reversed)</h4>
                            <p className="text-gray-300">{card.reversedMeaning}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleCardModal;
