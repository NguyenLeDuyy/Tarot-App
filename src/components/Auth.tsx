import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div>
            {isLogin ? <Login /> : <Register />}
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
            </button>
        </div>
    );
};

export default Auth;
