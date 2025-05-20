const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config(); // <<<<<< IMPORT MỚI ĐỂ DÙNG BIẾN MÔI TRƯỜNG

let GenAIConstructor, HarmCategoryClass, HarmBlockThresholdEnum; // Đổi tên để rõ ràng hơn

async function initializeGoogleGenAI() {
    try {
        const genAIModule = await import('@google/genai');
        GenAIConstructor = genAIModule.GoogleGenAI;
        HarmCategoryClass = genAIModule.HarmCategory;
        HarmBlockThresholdEnum = genAIModule.HarmBlockThreshold;

        if (typeof GenAIConstructor !== 'function') {
            console.error("Failed to load GoogleGenAI constructor from module.");
            throw new Error("GoogleGenAI constructor not loaded"); // Throw error to stop server start
        }
        console.log("Google GenAI SDK initialized successfully. GenAIConstructor is a:", typeof GenAIConstructor);
    } catch (err) {
        console.error("Error during Google GenAI SDK initialization:", err);
        throw err; // Re-throw error to stop server start
    }
}

// Định nghĩa model User
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String } // Thêm trường name nếu bạn muốn lưu tên người dùng
});
const User = mongoose.model('User', userSchema);

const app = express();
app.use(cors());
app.use(express.json());

// API Đăng ký
app.post('/api/auth/register', async (req, res) => {
    const { email, password, name } = req.body; // Nhận thêm name nếu có từ form đăng ký
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email đã tồn tại' });

        const hashedPassword = await bcrypt.hash(password, 10);
        // Nếu không có name từ form, có thể lấy phần trước @ của email làm name mặc định
        const userName = name || email.split('@')[0];
        const user = new User({ email, password: hashedPassword, name: userName });
        await user.save();
        // Trả về thông tin user đã đăng ký (không bao gồm password)
        res.status(201).json({
            message: 'Đăng ký thành công',
            user: { id: user._id, email: user.email, name: user.name }
        });
    } catch (error) {
        console.error("Lỗi API đăng ký:", error);
        res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
    }
});

// API Đăng nhập
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });

        // Tùy chọn: Tạo JWT token nếu bạn muốn sử dụng
        // const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

        // Trả về thông tin user (không bao gồm password) và token (nếu có)
        res.json({
            message: 'Đăng nhập thành công',
            user: {
                id: user._id, // _id là id mặc định của MongoDB
                email: user.email,
                name: user.name // Trả về name nếu có
            },
            // token: token // Uncomment nếu dùng JWT
        });
    } catch (error) {
        console.error("Lỗi API đăng nhập:", error);
        res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
    }
});

// API Luận giải Tarot với AI
app.post('/api/tarot/interpret', async (req, res) => {
    const { question, drawnCards, spreadName, spreadLayout } = req.body;

    if (!GenAIConstructor || !HarmCategoryClass || !HarmBlockThresholdEnum) {
        console.error("Google GenAI SDK (GenAIConstructor or helper classes) not initialized yet or failed to initialize.");
        return res.status(500).json({ message: "Lỗi máy chủ: Dịch vụ AI chưa sẵn sàng (SDK components)." });
    }

    if (!drawnCards || !Array.isArray(drawnCards) || drawnCards.length === 0) {
        return res.status(400).json({ message: 'Dữ liệu lá bài không hợp lệ.' });
    }
    if (!spreadName) {
        return res.status(400).json({ message: 'Tên trải bài không được cung cấp.' });
    }

    function constructAIPrompt(userQuestion, cards, sName, sLayout) {
        let prompt = `Bạn là một nhà đọc bài Tarot AI uyên bác và thấu cảm, với phong cách huyền bí và sâu sắc. Hãy đưa ra một luận giải chi tiết cho người dùng bằng tiếng Việt dựa trên thông tin sau:\n\n`;
        prompt += `Câu hỏi của người dùng: "${userQuestion || 'Không có câu hỏi cụ thể, xin một thông điệp chung.'}"\n\n`;
        prompt += `Kiểu trải bài: ${sName}\n`;

        if (sLayout && sLayout.length > 0) {
            prompt += `Ý nghĩa các vị trí trong trải bài và các lá bài tương ứng:\n`;
            cards.forEach((card, index) => {
                const positionMeaning = sLayout[index] ? sLayout[index] : `Vị trí ${index + 1}`;
                prompt += `- Vị trí ${index + 1} (${positionMeaning}): Lá ${card.name} (${card.isReversed ? 'Ngược' : 'Xuôi'}).\n`;
            });
            prompt += `\n`;
        } else {
            prompt += `Các lá bài đã rút (không có thông tin vị trí cụ thể, hãy luận giải tổng quan):\n`;
            cards.forEach((card, index) => {
                prompt += `- Lá ${index + 1}: ${card.name} (${card.isReversed ? 'Ngược' : 'Xuôi'}).\n`;
            });
            prompt += `\n`;
        }

        prompt += `Thông tin chi tiết về các lá bài đã rút:\n`;
        cards.forEach((card, index) => {
            const orientation = card.isReversed ? 'Ngược' : 'Xuôi';
            const meaning = card.isReversed ? card.reversedMeaning : card.uprightMeaning;
            const keywords = card.isReversed ? (card.keywordsReversed || []).join(', ') : (card.keywordsUpright || []).join(', ');

            prompt += `Lá bài ${card.name} (${orientation}) ${sLayout && sLayout[index] ? `(ở vị trí "${sLayout[index]}")` : `(ở vị trí ${index + 1})`}:\n`;
            prompt += `  Ý nghĩa ${orientation}: ${meaning}\n`;
            if (keywords) {
                prompt += `  Từ khóa ${orientation}: ${keywords}\n`;
            }
            prompt += `\n`;
        });

        prompt += `Hướng dẫn luận giải:\n`;
        prompt += `1. Với mỗi lá bài, hãy giải thích ý nghĩa của nó (dựa trên trạng thái xuôi/ngược đã cung cấp) trong bối cảnh vị trí của nó trong trải bài "${sName}" (nếu có thông tin vị trí) và liên hệ với câu hỏi của người dùng (nếu có).\n`;
        prompt += `2. Sau khi phân tích từng lá, hãy kết hợp ý nghĩa của tất cả các lá bài để đưa ra một cái nhìn tổng quan, thông điệp chính, và lời khuyên cụ thể (nếu có thể) cho người dùng.\n`;
        prompt += `3. Luận giải cần sâu sắc, chi tiết, mang tính xây dựng và sử dụng ngôn ngữ tiếng Việt phong phú, huyền bí, và gợi mở. Tránh lặp lại các từ khóa một cách máy móc.\n`;
        prompt += `4. Đảm bảo toàn bộ luận giải là bằng tiếng Việt.\n`;
        prompt += `5. Bắt đầu phần luận giải của bạn ngay sau đây.\n\nLuận giải của bạn:\n`;
        return prompt;
    }

    const aiPrompt = constructAIPrompt(question, drawnCards, spreadName, spreadLayout);

    try {
        const apiKeyToUse = process.env.GEMINI_API_KEY;
        console.log(`DEBUG: GEMINI_API_KEY from env: "${apiKeyToUse ? apiKeyToUse.substring(0, 5) + '...' : 'NOT FOUND'}"`);

        if (!apiKeyToUse) {
            console.error("Gemini API key không được tìm thấy trong biến môi trường.");
            return res.status(500).json({ message: "Lỗi cấu hình máy chủ: thiếu API key Gemini." });
        }

        console.log('DEBUG: Attempting to create genAIInstance. GenAIConstructor is a:', typeof GenAIConstructor);
        const genAIInstance = new GenAIConstructor({ apiKey: apiKeyToUse });
        console.log('DEBUG: genAIInstance created.');
        console.log('DEBUG: genAIInstance.models exists:', typeof genAIInstance.models === 'object' && genAIInstance.models !== null);
        console.log('DEBUG: genAIInstance.models.generateContent is a function:', typeof genAIInstance.models?.generateContent === 'function');

        const modelName = "gemini-1.5-flash-latest";
        console.log(`DEBUG: Using modelName: ${modelName}`);

        // Cấu hình an toàn
        const safetySettings = [
            { category: HarmCategoryClass.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThresholdEnum.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategoryClass.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThresholdEnum.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategoryClass.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThresholdEnum.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategoryClass.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThresholdEnum.BLOCK_MEDIUM_AND_ABOVE },
        ];
        // Cấu hình sinh văn bản
        const generationConfig = { temperature: 0.6, topK: 40, topP: 0.95, maxOutputTokens: 2048 };

        // Sử dụng genAIInstance.models.generateContent()
        const result = await genAIInstance.models.generateContent({
            model: modelName,
            contents: [{ role: "user", parts: [{ text: aiPrompt }] }], // Prompt của bạn là nội dung
            generationConfig: generationConfig,
            safetySettings: safetySettings,
        });
        console.log('DEBUG: generateContent result received.');
        console.log('DEBUG: Full result object:', JSON.stringify(result, null, 2));

        let interpretation = "Không nhận được luận giải từ AI.";

        if (result && result.candidates && result.candidates.length > 0) {
            // Kiểm tra promptFeedback trực tiếp trên result nếu có
            if (result.promptFeedback && result.promptFeedback.blockReason) {
                console.error('Gemini API: Prompt bị chặn (trên result):', result.promptFeedback.blockReason, result.promptFeedback.safetyRatings);
                return res.status(400).json({ message: `Yêu cầu bị chặn bởi bộ lọc an toàn: ${result.promptFeedback.blockReason}. Vui lòng điều chỉnh câu hỏi hoặc nội dung.` });
            }

            const firstCandidate = result.candidates[0];
            if (firstCandidate.content && firstCandidate.content.parts && firstCandidate.content.parts.length > 0 && firstCandidate.content.parts[0].text) {
                interpretation = firstCandidate.content.parts[0].text;
                console.log('DEBUG: Interpretation extracted successfully.');
            } else {
                console.error('DEBUG: Could not find text in result.candidates[0].content.parts[0].text');
            }

            if (firstCandidate.finishReason && firstCandidate.finishReason !== 'STOP') {
                console.error('Gemini API: Kết thúc không như mong đợi (trên result.candidates):', firstCandidate.finishReason, firstCandidate.safetyRatings);
                // Chỉ cập nhật interpretation nếu nó vẫn là giá trị mặc định
                if (interpretation === "Không nhận được luận giải từ AI." || !interpretation.trim()) {
                    interpretation = `Luận giải có thể không hoàn chỉnh do: ${firstCandidate.finishReason}.`;
                }
            }
        } else {
            console.error('DEBUG: Gemini API did not return a result object with candidates from generateContent.');
        }

        res.json({ interpretation });

    } catch (error) {
        console.error("Lỗi khi gọi API Gemini:", error); // Đây là lỗi TypeError bạn đang gặp
        if (error.response && error.response.data && error.response.data.error) {
            const errDetails = error.response.data.error;
            console.error("Chi tiết lỗi từ Gemini:", errDetails.message);
            if (errDetails.status === 'INVALID_ARGUMENT' && errDetails.message.includes('API key not valid')) {
                return res.status(401).json({ message: "Lỗi xác thực với dịch vụ Gemini. API key không hợp lệ. Kiểm tra lại API key." });
            }
            if (errDetails.status === 'RESOURCE_EXHAUSTED' || (errDetails.message && errDetails.message.toLowerCase().includes("quota"))) {
                return res.status(429).json({ message: "Đã đạt đến giới hạn sử dụng API Gemini (quota exhausted). Vui lòng thử lại sau." });
            }
            return res.status(500).json({ message: `Lỗi từ Gemini: ${errDetails.message}` });
        } else if (error.message && (error.message.toLowerCase().includes("api key not valid") || error.message.toLowerCase().includes("api_key_invalid"))) {
            return res.status(401).json({ message: "Lỗi xác thực với dịch vụ Gemini. API key không hợp lệ. Kiểm tra lại API key." });
        }
        res.status(500).json({ message: "Lỗi máy chủ nội bộ khi xử lý yêu cầu luận giải với Gemini." });
    }
});

async function startServer() {
    try {
        await initializeGoogleGenAI(); // Đảm bảo SDK được khởi tạo trước

        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://leduynaruto:g70Tm0DIDEV31i7y@cluster0.mkz24xe.mongodb.net/tarot-app?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Kết nối MongoDB thành công!');

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server đang chạy ở http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Không thể khởi động server:", error);
        process.exit(1); // Thoát nếu không khởi tạo được các thành phần cốt lõi
    }
}

startServer();
