import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
    // Định nghĩa các thuộc tính của user mà bạn muốn lưu, ví dụ:
    id: string;
    email: string;
    name?: string; // Tên người dùng, có thể lấy từ email hoặc cho phép cập nhật sau
    // token?: string; // JWT token nếu bạn dùng
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (userData: User /*, token?: string */) => void;
    logout: () => void;
    isLoading: boolean; // Để xử lý việc kiểm tra trạng thái đăng nhập ban đầu
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Ban đầu là true

    // Kiểm tra trạng thái đăng nhập từ localStorage khi component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('tarotUser');
        // const storedToken = localStorage.getItem('tarotToken'); // Nếu có token

        if (storedUser /* && storedToken */) {
            try {
                const parsedUser: User = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsLoggedIn(true);
                // TODO: Có thể thêm bước validate token với backend ở đây nếu cần
            } catch (error) {
                console.error("Failed to parse user from localStorage", error);
                localStorage.removeItem('tarotUser');
                // localStorage.removeItem('tarotToken');
            }
        }
        setIsLoading(false); // Kết thúc loading sau khi kiểm tra xong
    }, []);

    const login = (userData: User /*, token?: string */) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('tarotUser', JSON.stringify(userData));
        // if (token) localStorage.setItem('tarotToken', token);
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('tarotUser');
        // localStorage.removeItem('tarotToken');
        // TODO: Gọi API logout backend nếu cần (ví dụ: để vô hiệu hóa token phía server)
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
