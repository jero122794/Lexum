'use client';
import styles from './Navbar.module.css';
import { FiBell } from 'react-icons/fi';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        {/* Espacio opcional para botones */}
        {/* <button className={styles.button}>Exportar</button>
        <button className={styles.primary}>+ Nuevo caso</button> */}
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <FiBell size={18} />
        </button>

        <div className={styles.avatar}>
          <span>JD</span> {/* Iniciales del usuario */}
        </div>
      </div>
    </header>
  );
}
