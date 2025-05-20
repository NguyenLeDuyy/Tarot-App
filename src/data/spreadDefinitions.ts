export interface SpreadDefinition {
    id: string;
    name: string;
    cardCount: number;
    layout: string[];
    description: string; // Mô tả chung về trải bài
    purpose?: string; // Mục đích sử dụng
    questions?: string[]; // Ví dụ câu hỏi phù hợp
}

export const spreadDefinitions: { [key: string]: SpreadDefinition } = {
    'three-card': {
        id: 'three-card',
        name: 'Trải Bài 3 Lá',
        cardCount: 3,
        layout: ['Quá khứ', 'Hiện tại', 'Tương lai'],
        description: 'Một trải bài nhanh chóng và hiệu quả, cung cấp cái nhìn tổng quan về một tình huống bằng cách khám phá các yếu tố từ quá khứ, những gì đang diễn ra ở hiện tại và kết quả hoặc hướng đi tiềm năng trong tương lai.',
        purpose: 'Phù hợp để làm rõ một vấn đề cụ thể, đưa ra quyết định nhanh hoặc khi cần một thông điệp ngắn gọn.',
        questions: [
            'Tôi nên hiểu tình hình này như thế nào?',
            'Điều gì đang ảnh hưởng đến quyết định của tôi?',
            'Kết quả có thể là gì nếu tôi tiếp tục theo hướng này?'
        ]
    },
    'celtic-cross': {
        id: 'celtic-cross',
        name: 'Trải Bài Celtic Cross',
        cardCount: 10,
        layout: [
            '1. Tình hình hiện tại / Bạn',
            '2. Thách thức / Trở ngại',
            '3. Nền tảng / Quá khứ vô thức',
            '4. Quá khứ gần đây',
            '5. Tiềm năng / Mục tiêu',
            '6. Tương lai gần',
            '7. Thái độ của bạn / Cách bạn nhìn nhận',
            '8. Môi trường / Ảnh hưởng bên ngoài',
            '9. Hy vọng và Nỗi sợ',
            '10. Kết quả cuối cùng'
        ],
        description: 'Một trong những trải bài Tarot cổ điển và toàn diện nhất. Celtic Cross đi sâu vào các khía cạnh khác nhau của một vấn đề, từ nền tảng, thách thức, ảnh hưởng bên ngoài đến kết quả tiềm năng, cung cấp một bức tranh chi tiết và nhiều lớp.',
        purpose: 'Tuyệt vời cho các câu hỏi phức tạp, khi bạn muốn khám phá sâu một tình huống hoặc hiểu rõ hơn về các động lực tiềm ẩn.',
        questions: [
            'Tôi cần biết điều gì về [một tình huống cụ thể]?',
            'Làm thế nào để tôi vượt qua thử thách này?',
            'Con đường sự nghiệp/tình yêu của tôi sẽ phát triển như thế nào?'
        ]
    },
    'love-relationship': {
        id: 'love-relationship',
        name: 'Trải Bài Tình Yêu',
        cardCount: 5, // Số lá có thể thay đổi tùy theo định nghĩa bạn muốn
        layout: [
            '1. Bạn trong mối quan hệ',
            '2. Đối phương trong mối quan hệ',
            '3. Động lực chính của mối quan hệ',
            '4. Thách thức cần vượt qua',
            '5. Tiềm năng phát triển của mối quan hệ'
        ],
        description: 'Trải bài này tập trung vào các khía cạnh của một mối quan hệ tình cảm. Nó giúp làm sáng tỏ cảm xúc, động lực, thách thức và tiềm năng giữa bạn và đối phương.',
        purpose: 'Dành cho các câu hỏi về tình yêu, mối quan hệ hiện tại, hoặc để hiểu rõ hơn về kết nối với một người cụ thể.',
        questions: [
            'Mối quan hệ này đang diễn tiến như thế nào?',
            'Tôi và người ấy có thể cải thiện điều gì?',
            'Tương lai của chúng tôi sẽ ra sao?'
        ]
    },
    'career-path': {
        id: 'career-path',
        name: 'Trải Bài Sự Nghiệp',
        cardCount: 4,
        layout: ['Hiện trạng sự nghiệp', 'Trở ngại chính', 'Cơ hội tiềm ẩn', 'Lời khuyên hành động'],
        description: 'Trải bài này giúp bạn nhìn nhận rõ hơn về con đường sự nghiệp hiện tại, những khó khăn gặp phải, các cơ hội có thể nắm bắt và nhận được lời khuyên để phát triển.',
        purpose: 'Hỗ trợ trong việc định hướng nghề nghiệp, giải quyết các vấn đề trong công việc, hoặc tìm kiếm cơ hội mới.',
        questions: [
            'Tôi có nên thay đổi công việc hiện tại không?',
            'Làm thế nào để tôi thăng tiến trong sự nghiệp?',
            'Đâu là trở ngại lớn nhất của tôi trong công việc?'
        ]
    }
    // Thêm các spread khác nếu cần
}; 