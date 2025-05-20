import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ReadingHistoryPage: React.FC = () => {
    const [readings, setReadings] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        fetchReadingHistory();
    }, [user, navigate]);

    const fetchReadingHistory = async () => {
        if (!user) return;

        try {
            const response = await fetch(`http://localhost:5000/api/tarot/reading-history/${user.id}`);
            if (!response.ok) throw new Error('Không thể lấy lịch sử');

            const data = await response.json();
            setReadings(data);
        } catch (error) {
            setError('Lỗi khi tải lịch sử bói');
        } finally {
            setLoading(false);
        }
    };

    const viewReadingDetail = (readingId: string) => {
        navigate(`/tarot/history/${readingId}`);
    };

    if (loading) return <div className="text-center py-10">Đang tải...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Lịch Sử Bói Bài Của Bạn</h1>

            {readings.length === 0 ? (
                <p className="text-center text-gray-500">Bạn chưa có lần bói nào được lưu</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {readings.map(reading => (
                        <div
                            key={reading._id}
                            className="bg-slate-800/70 p-5 rounded-xl cursor-pointer hover:bg-slate-700/70 transition"
                            onClick={() => viewReadingDetail(reading._id)}
                        >
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold text-purple-300">{reading.spreadName}</span>
                                <span className="text-sm text-gray-400">
                                    {new Date(reading.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            {reading.question && (
                                <p className="text-gray-300 text-sm italic mb-3 truncate">"{reading.question}"</p>
                            )}

                            <div className="text-gray-400 text-sm">
                                <span>{reading.drawnCards.length} lá bài</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReadingHistoryPage;
