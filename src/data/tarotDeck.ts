export interface TarotCard {
    id: string;
    name: string;
    image: string; // Đường dẫn đến hình ảnh lá bài
    // Thêm các thuộc tính khác sau này như: keywords, upright_meaning, reversed_meaning
}

// Đây là danh sách rút gọn, bạn cần thêm đủ 78 lá bài
// Hình ảnh hiện tại là placeholder, bạn sẽ cần thay thế bằng hình ảnh thật
const majorArcana = [
    { id: 'major-0', name: 'The Fool', image: '/src/assets/images/cards/major-arcana/00-fool.jpg' },
    { id: 'major-1', name: 'The Magician', image: '/src/assets/images/cards/major-arcana/01-magician.jpg' },
    { id: 'major-2', name: 'The High Priestess', image: '/src/assets/images/cards/major-arcana/02-high-priestess.jpg' },
    // ... thêm 22 lá Major Arcana
];

const cups = [
    { id: 'cups-ace', name: 'Ace of Cups', image: '/src/assets/images/cards/minor-arcana/cups/ace-of-cups.jpg' },
    { id: 'cups-2', name: 'Two of Cups', image: '/src/assets/images/cards/minor-arcana/cups/two-of-cups.jpg' },
    // ... 14 lá Cups
];

const pentacles = [
    { id: 'pentacles-ace', name: 'Ace of Pentacles', image: '/src/assets/images/cards/minor-arcana/pentacles/ace-of-pentacles.jpg' },
    // ... 14 lá Pentacles
];

const swords = [
    { id: 'swords-ace', name: 'Ace of Swords', image: '/src/assets/images/cards/minor-arcana/swords/ace-of-swords.jpg' },
    // ... 14 lá Swords
];

const wands = [
    { id: 'wands-ace', name: 'Ace of Wands', image: '/src/assets/images/cards/minor-arcana/wands/ace-of-wands.jpg' },
    // ... 14 lá Wands
];

// Giả sử bạn đã tạo đủ 78 lá, đây là cách gộp
// Bạn cần hoàn thiện danh sách này với đầy đủ 78 lá bài
export const fullTarotDeck: TarotCard[] = [
    ...majorArcana,
    ...cups,
    ...pentacles,
    ...swords,
    ...wands
    // Hãy đảm bảo bạn có đủ 78 lá bài ở đây
    // Ví dụ để đủ 78 lá, bạn cần thêm nhiều lá bài vào các mảng trên
    // Hoặc tạo một mảng lớn chứa tất cả 78 lá.
    // For demonstration, let's add some more placeholders to reach a reasonable number for testing spreads
    // { id: 'major-3', name: 'The Empress', image: '/src/assets/images/cards/placeholder.jpg' },
    // ... (cho đến khi đủ 78 lá)
].slice(0, 78); // Cắt để đảm bảo có đúng 78 lá nếu bạn thêm dư

// Để test, chúng ta sẽ tạo một bộ bài giả định có đủ số lượng
// Trong thực tế, bạn cần định nghĩa đầy đủ 78 lá.
const placeholderCard = (id: number): TarotCard => ({
    id: `card-${id}`,
    name: `Card ${id + 1}`,
    image: `/src/assets/images/cards/placeholder-card-back.png` // Nên có 1 ảnh card back
});

export const testingTarotDeck: TarotCard[] = Array.from({ length: 78 }, (_, i) => placeholderCard(i));
