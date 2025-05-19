const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

// Kết nối MongoDB (thay đổi URI nếu dùng MongoDB Atlas)
mongoose.connect('mongodb+srv://leduynaruto:g70Tm0DIDEV31i7y@cluster0.mkz24xe.mongodb.net/tarot-app?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Kết nối MongoDB thành công!'))
    .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// Định nghĩa model User
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

const app = express();
app.use(cors());
app.use(express.json());

// API Đăng ký
app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email đã tồn tại' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.json({ message: 'Đăng ký thành công' });
});

// API Đăng nhập
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });
    res.json({ message: 'Đăng nhập thành công' });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy ở http://localhost:${PORT}`);
});
