// ... existing code ...
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
// Đường dẫn được cập nhật và giả sử tên file là Login.tsx và Register.tsx trong components
import LoginPage from './components/Login'
import RegisterPage from './components/Register'
import Layout from './components/Layout'
import SelectSpreadPage from './pages/SelectSpreadPage';
import TarotReadingPage from './pages/TarotReadingPage';
import ReadingResultPage from './pages/ReadingResultPage';
import ReadingHistoryPage from './pages/ReadingHistoryPage';
import ReadingDetailPage from './pages/ReadingDetailPage';
import './App.css' // Nếu có

const App: React.FC = () => {
  return (
    <Router>
      <Layout> {/* <<<<<< SỬ DỤNG LAYOUT */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tarot/select-spread" element={<SelectSpreadPage />} /> {/* <<<<<< ROUTE MỚI */}
          <Route path="/tarot/reading/:spreadId" element={<TarotReadingPage />} /> {/* <<<<<< ROUTE MỚI */}
          <Route path="/tarot/result" element={<ReadingResultPage />} /> {/* <<<<<< ROUTE MỚI */}
          <Route path="/tarot/history" element={<ReadingHistoryPage />} />
          <Route path="/tarot/history/:readingId" element={<ReadingDetailPage />} />
          {/* Thêm các routes khác ở đây, ví dụ cho TarotReadingPage sau này */}
          {/* <Route path="/tarot/reading/:spreadId" element={<TarotReadingPage />} /> */}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
// ... existing code ...