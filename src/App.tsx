// ... existing code ...
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/Login' // Nên chuyển thành pages/Login.tsx
import Register from './components/Register' // Nên chuyển thành pages/Register.tsx
import Layout from './components/Layout' // <<<<<< IMPORT MỚI
import './App.css' // Nếu có

const App: React.FC = () => {
  return (
    <Router>
      <Layout> {/* <<<<<< SỬ DỤNG LAYOUT */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Thêm các routes khác ở đây */}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
// ... existing code ...