// ... existing code ...
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'
// import './index.css'; // Đảm bảo index.css chứa các style toàn cục (như animation fadeIn)
import { AuthProvider } from "./contexts/AuthContext.tsx"; // <<<<<< IMPORT MỚI


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider> {/* <<<<<< BỌC AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
)