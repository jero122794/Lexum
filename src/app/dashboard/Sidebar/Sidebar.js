'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import {
  FiMenu,
  FiUser,
  FiFileText,
  FiCalendar,
  FiBookOpen,
  FiSearch,
  FiMessageSquare,
  FiSettings
} from 'react-icons/fi';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.topSection}>
        <button className={styles.toggleBtn} onClick={toggleSidebar}>
          <FiMenu />
        </button>
        {!collapsed && <h1 className={styles.logo}>LEXEUM</h1>}
      </div>

      <nav className={styles.menu}>
        {/* SECCIONES COMENTADAS PARA FUTURO
        <Link href="/dashboard">
          <div className={`${styles.item} ${pathname === '/dashboard' ? styles.active : ''}`}>
            <FiUser />
            {!collapsed && <span>Dashboard</span>}
          </div>
        </Link>
        <Link href="/dashboard/casos">
          <div className={`${styles.item} ${pathname === '/dashboard/casos' ? styles.active : ''}`}>
            <FiUser />
            {!collapsed && <span>Casos</span>}
          </div>
        </Link>
        <Link href="/dashboard/clientes">
          <div className={`${styles.item} ${pathname === '/dashboard/clientes' ? styles.active : ''}`}>
            <FiUser />
            {!collapsed && <span>Clientes</span>}
          </div>
        </Link>
        <Link href="/dashboard/contratos">
          <div className={`${styles.item} ${pathname === '/dashboard/contratos' ? styles.active : ''}`}>
            <FiFileText />
            {!collapsed && <span>Contratos</span>}
          </div>
        </Link>
        <Link href="/dashboard/documentos">
          <div className={`${styles.item} ${pathname === '/dashboard/documentos' ? styles.active : ''}`}>
            <FiFileText />
            {!collapsed && <span>Documentos</span>}
          </div>
        </Link>
        <Link href="/dashboard/calendario">
          <div className={`${styles.item} ${pathname === '/dashboard/calendario' ? styles.active : ''}`}>
            <FiCalendar />
            {!collapsed && <span>Calendario</span>}
          </div>
        </Link>
        <Link href="/dashboard/legelresearch">
          <div className={`${styles.item} ${pathname === '/dashboard/legelresearch' ? styles.active : ''}`}>
            <FiSearch />
            {!collapsed && <span>Legal Research</span>}
          </div>
        </Link>
        */}

        {/* ACTIVA: Asistente Legal IA */}
        <Link href="/dashboard/asistente-ia">
          <div className={`${styles.item} ${pathname === '/dashboard/asistente-ia' ? styles.active : ''}`}>
            <FiMessageSquare />
            {!collapsed && <span>Asistente Legal IA</span>}
          </div>
        </Link>
      </nav>

      <div className={styles.bottom}>
        {/* <Link href="/dashboard/configuracion">
          <div className={`${styles.item} ${pathname === '/dashboard/configuracion' ? styles.active : ''}`}>
            <FiSettings />
            {!collapsed && <span>Configuración</span>}
          </div>
        </Link>
        <Link href="/dashboard/perfil">
          <div className={`${styles.item} ${pathname === '/dashboard/perfil' ? styles.active : ''}`}>
            <FiUser />
            {!collapsed && <span>Mi Perfil</span>}
          </div>
        </Link> */}
      </div>
    </aside>
  );
}
