import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
    <div>
        <h1>Chào mừng đến với Tarot AI!</h1>
        <p>Khám phá trải bài Tarot, đặt câu hỏi và nhận luận giải từ AI.</p>
        <Link to="/login"><button>Đăng nhập</button></Link>
        <Link to="/register"><button>Đăng ký</button></Link>
    </div>
);

export default Home;
