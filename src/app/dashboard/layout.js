// src/app/dashboard/layout.js
'use client';
import Sidebar from './Sidebar/Sidebar';
import './dashboard.module.css'; // si tenés estilos globales, opcional

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#f9fafb' }}>
        {children}
      </main>
    </div>
  );
}
