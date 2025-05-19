const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken'); // Sẽ cần nếu bạn dùng JWT

// Kết nối MongoDB (thay đổi URI nếu dùng MongoDB Atlas)
mongoose.connect('mongodb+srv://leduynaruto:g70Tm0DIDEV31i7y@cluster0.mkz24xe.mongodb.net/tarot-app?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Kết nối MongoDB thành công!'))
    .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

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

const PORT = process.env.PORT || 5000; // Sử dụng PORT từ biến môi trường hoặc 5000
app.listen(PORT, () => {
    console.log(`Server đang chạy ở http://localhost:${PORT}`);
});
