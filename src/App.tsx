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
import AboutTarotPage from './pages/AboutTarotPage';
import AboutProjectPage from './pages/AboutProjectPage';

// <<<<<< IMPORT CÁC TRANG SPREAD INFO MỚI >>>>>>
import ThreeCardSpreadPage from './pages/ThreeCardSpreadPage';
import CelticCrossSpreadPage from './pages/CelticCrossSpreadPage';
import LoveSpreadPage from './pages/LoveSpreadPage';
import CareerPathSpreadPage from './pages/CareerPathSpreadPage';

// <<<<<< IMPORT EXPLORE PAGES >>>>>>
import MajorArcanaPage from './pages/MajorArcanaPage';
import SuitPage from './pages/SuitPage';
import AllCardsPage from './pages/AllCardsPage';

import './App.css' // Nếu có

const App: React.FC = () => {
  return (
    <Router>
      <Layout> {/* <<<<<< SỬ DỤNG LAYOUT */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Routes for spread information pages */}
          <Route path="/spreads/three-card" element={<ThreeCardSpreadPage />} />
          <Route path="/spreads/celtic-cross" element={<CelticCrossSpreadPage />} />
          <Route path="/spreads/love-relationship" element={<LoveSpreadPage />} />
          <Route path="/spreads/career-path" element={<CareerPathSpreadPage />} />

          {/* Routes for Explore Card pages */}
          <Route path="/explore/major-arcana" element={<MajorArcanaPage />} />
          <Route path="/explore/minor-arcana/:suitName" element={<SuitPage />} /> {/* :suitName will be cups, wands, etc. */}
          <Route path="/explore/all-cards" element={<AllCardsPage />} />

          <Route path="/tarot/select-spread" element={<SelectSpreadPage />} /> {/* <<<<<< ROUTE MỚI */}
          <Route path="/tarot/reading/:spreadId" element={<TarotReadingPage />} /> {/* <<<<<< ROUTE MỚI */}
          <Route path="/tarot/result" element={<ReadingResultPage />} /> {/* <<<<<< ROUTE MỚI */}
          <Route path="/tarot/history" element={<ReadingHistoryPage />} />
          <Route path="/tarot/history/:readingId" element={<ReadingDetailPage />} />
          <Route path="/about-tarot" element={<AboutTarotPage />} />
          <Route path="/about-project" element={<AboutProjectPage />} />
          {/* Thêm các routes khác ở đây, ví dụ cho TarotReadingPage sau này */}
          {/* <Route path="/tarot/reading/:spreadId" element={<TarotReadingPage />} /> */}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
// ... existing code ...