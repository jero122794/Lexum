// src/app/dashboard/layout.js
'use client';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flexGrow: 1, backgroundColor: '#f9fafb' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
