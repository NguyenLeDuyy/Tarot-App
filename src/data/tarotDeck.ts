export interface TarotCard {
    id: string;
    name: string;
    image: string; // Đường dẫn đến hình ảnh lá bài
    uprightMeaning: string; // Nghĩa xuôi
    reversedMeaning: string; // Nghĩa ngược
    keywordsUpright?: string[]; // Từ khóa khi lá bài xuôi (tùy chọn)
    keywordsReversed?: string[]; // Từ khóa khi lá bài ngược (tùy chọn)
    // Thêm các thuộc tính khác sau này như: suit, number, astrological_sign, element, etc.
}

// Đây là danh sách rút gọn, bạn cần thêm đủ 78 lá bài
// Hình ảnh hiện tại là placeholder, bạn sẽ cần thay thế bằng hình ảnh thật
const majorArcana = [
    {
        id: 'major-0',
        name: 'The Fool',
        image: '/src/assets/images/cards/major-arcana/00-fool.jpg',
        uprightMeaning: 'Sự khởi đầu mới, ngây thơ, tự phát, một tinh thần tự do, niềm tin vào vũ trụ.',
        reversedMeaning: 'Sự ngây thơ biến thành ngu ngốc, chấp nhận rủi ro không cần thiết, thiếu suy nghĩ, liều lĩnh.',
        keywordsUpright: ['khởi đầu', 'ngây thơ', 'tự do', 'phiêu lưu'],
        keywordsReversed: ['liều lĩnh', 'thiếu thận trọng', 'ngu ngốc', 'bất cẩn'],
    },
    {
        id: 'major-1',
        name: 'The Magician',
        image: '/src/assets/images/cards/major-arcana/01-magician.jpg',
        uprightMeaning: 'Sức mạnh ý chí, sự sáng tạo, kỹ năng, tập trung, hiện thực hóa.',
        reversedMeaning: 'Lừa dối, thao túng, kỹ năng bị lạm dụng, thiếu tự tin, sức mạnh bị chặn đứng.',
        keywordsUpright: ['sức mạnh', 'sáng tạo', 'kỹ năng', 'ý chí'],
        keywordsReversed: ['lừa dối', 'thao túng', 'bất lực', 'ảo tưởng'],
    },
    {
        id: 'major-2',
        name: 'The High Priestess',
        image: '/src/assets/images/cards/major-arcana/02-high-priestess.jpg',
        uprightMeaning: 'Trực giác, bí ẩn, tiềm thức, sự khôn ngoan nội tâm, bí mật.',
        reversedMeaning: 'Bỏ qua trực giác, bí mật bị phơi bày, thiếu hiểu biết về bản thân, thông tin sai lệch.',
        keywordsUpright: ['trực giác', 'bí ẩn', 'tiềm thức', 'nữ tính thiêng liêng'],
        keywordsReversed: ['bỏ lỡ dấu hiệu', 'bí mật', 'mất kết nối', 'bề nổi'],
    },
    // ... thêm 22 lá Major Arcana với đầy đủ thông tin
];

const cups = [
    {
        id: 'cups-ace',
        name: 'Ace of Cups',
        image: '/src/assets/images/cards/minor-arcana/cups/ace-of-cups.jpg',
        uprightMeaning: 'Tình yêu mới, lòng trắc ẩn, sự sáng tạo, cảm xúc dâng trào, mối quan hệ mới.',
        reversedMeaning: 'Cảm xúc bị kìm nén, tình yêu bị từ chối, sự trống rỗng, sáng tạo bị chặn.',
        keywordsUpright: ['tình yêu', 'cảm xúc', 'sáng tạo', 'niềm vui'],
        keywordsReversed: ['kìm nén', 'trống rỗng', 'mất mát', 'buồn bã'],
    },
    {
        id: 'cups-2',
        name: 'Two of Cups',
        image: '/src/assets/images/cards/minor-arcana/cups/two-of-cups.jpg',
        uprightMeaning: 'Sự hợp nhất, quan hệ đối tác, tình yêu, sự hấp dẫn lẫn nhau, hòa hợp.',
        reversedMeaning: 'Mất cân bằng trong mối quan hệ, bất hòa, chia ly, thiếu tôn trọng.',
        keywordsUpright: ['kết nối', 'hợp tác', 'tình yêu đôi lứa', 'hòa hợp'],
        keywordsReversed: ['bất đồng', 'chia rẽ', 'mất cân bằng', 'xung đột'],
    },
    // ... 14 lá Cups với đầy đủ thông tin
];

const pentacles = [
    {
        id: 'pentacles-ace',
        name: 'Ace of Pentacles',
        image: '/src/assets/images/cards/minor-arcana/pentacles/ace-of-pentacles.jpg',
        uprightMeaning: 'Cơ hội mới về vật chất, sự thịnh vượng, đầu tư, biểu hiện thực tế.',
        reversedMeaning: 'Bỏ lỡ cơ hội, quyết định tài chính tồi tệ, thiếu tầm nhìn xa.',
        keywordsUpright: ['thịnh vượng', 'cơ hội vật chất', 'ổn định', 'an toàn'],
        keywordsReversed: ['tham lam', 'mất mát tài chính', 'rủi ro không đáng', 'bất ổn'],
    },
    // ... 14 lá Pentacles với đầy đủ thông tin
];

const swords = [
    {
        id: 'swords-ace',
        name: 'Ace of Swords',
        image: '/src/assets/images/cards/minor-arcana/swords/ace-of-swords.jpg',
        uprightMeaning: 'Sự thật, rõ ràng, đột phá tinh thần, chiến thắng, quyết tâm.',
        reversedMeaning: 'Nhầm lẫn, thiếu rõ ràng, quyết định sai lầm, hỗn loạn.',
        keywordsUpright: ['sự thật', 'minh mẫn', 'công lý', 'đột phá'],
        keywordsReversed: ['nhầm lẫn', 'lừa dối', 'tàn nhẫn', 'hiểu lầm'],
    },
    // ... 14 lá Swords với đầy đủ thông tin
];

const wands = [
    {
        id: 'wands-ace',
        name: 'Ace of Wands',
        image: '/src/assets/images/cards/minor-arcana/wands/ace-of-wands.jpg',
        uprightMeaning: 'Nguồn cảm hứng mới, năng lượng, sự sáng tạo, tiềm năng, lòng dũng cảm.',
        reversedMeaning: 'Thiếu động lực, trì hoãn, cơ hội bị bỏ lỡ, sự nhàm chán.',
        keywordsUpright: ['cảm hứng', 'đam mê', 'sáng tạo', 'khởi đầu mới'],
        keywordsReversed: ['trì hoãn', 'thiếu năng lượng', 'bế tắc', 'thất vọng'],
    },
    // ... 14 lá Wands với đầy đủ thông tin
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
    image: `/src/assets/images/cards/placeholder-card-back.png`, // Nên có 1 ảnh card back
    uprightMeaning: `Đây là nghĩa xuôi của Card ${id + 1}. Nó biểu thị sự khởi đầu, cơ hội và tiềm năng.`,
    reversedMeaning: `Đây là nghĩa ngược của Card ${id + 1}. Nó cảnh báo về sự trì hoãn, bỏ lỡ hoặc năng lượng bị chặn.`,
    keywordsUpright: ['tiềm năng', 'cơ hội', `xuôi ${id + 1}`],
    keywordsReversed: ['trì hoãn', 'thách thức', `ngược ${id + 1}`],
});

export const testingTarotDeck: TarotCard[] = Array.from({ length: 78 }, (_, i) => placeholderCard(i));
