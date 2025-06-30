'use client';
import { useState } from 'react';
import styles from './Navbar.module.css';
import { FiBell } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  // Estado para simular notificaciones
  const [hasNotifications, setHasNotifications] = useState(true);

  // Mapeo de rutas a títulos, mejorado para sub-rutas
  const sectionTitles = {
    '/dashboard': 'Inicio',
    '/dashboard/asistente-ia': 'Asistente Legal IA',
    '/dashboard/casos': 'Casos',
    '/dashboard/clientes': 'Clientes',
    '/dashboard/contratos': 'Contratos',
    '/dashboard/documentos': 'Documentos',
    '/dashboard/calendario': 'Calendario',
    '/dashboard/legalresearch': 'Legal Research',
    '/dashboard/configuracion': 'Configuración',
    '/dashboard/perfil': 'Mi Perfil'
  };

  // Función para encontrar el título de la ruta actual, incluyendo sub-rutas
  const getTitleForPath = (path) => {
    // Busca la clave exacta
    if (sectionTitles[path]) {
      return sectionTitles[path];
    }
    // Si no es exacta, busca la clave que comienza con la ruta
    const foundKey = Object.keys(sectionTitles).find(key => path.startsWith(key));
    return foundKey ? sectionTitles[foundKey] : 'Dashboard'; // Título por defecto
  };

  const currentTitle = getTitleForPath(pathname);

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        {/* Aquí puedes agregar botones o un icono de menú para móvil si es necesario */}
      </div>

      <div className={styles.center}>
        {currentTitle && <h2 className={styles.sectionTitle}>{currentTitle}</h2>}
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <FiBell size={22} /> {/* Ícono un poco más grande */}
          {hasNotifications && <span className={styles.notificationBadge}></span>}
        </button>
        <div className={styles.avatar}>
          <span>JD</span>
        </div>
      </div>
    </header>
  );
}