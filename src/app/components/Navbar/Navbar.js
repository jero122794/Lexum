'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

// Importá los modales
import LoginModal from '../../login/page';
import RegisterModal from '../../register/page';


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <img src="/Recurso 20.svg" alt="Logo LEXEUM" className={styles.logoImg} />
          LEXEUM
        </div>

        <div className={styles.menuToggle} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
          <nav className={styles.mainNav}>
            <Link href="/" className={pathname === '/' ? styles.active : ''} onClick={closeMenu}>
              Inicio
            </Link>
            <Link href="/soluciones" className={pathname === '/soluciones' ? styles.active : ''} onClick={closeMenu}>
              Soluciones
            </Link>
            <Link href="/precios" className={pathname === '/precios' ? styles.active : ''} onClick={closeMenu}>
              Precios
            </Link>
            <Link href="/recursos" className={pathname === '/recursos' ? styles.active : ''} onClick={closeMenu}>
              Recursos
            </Link>
            <Link href="/contacto" className={pathname === '/contacto' ? styles.active : ''} onClick={closeMenu}>
              Contacto
            </Link>
          </nav>

          <div className={styles.authButtons}>
            <button
              className={styles.login}
              onClick={() => {
                closeMenu();
                setShowLogin(true);
              }}
            >
              Acceso
            </button>

            <button
              className={styles.register}
              onClick={() => {
                closeMenu();
                setShowRegister(true);
              }}
            >
              Inscribirse
            </button>
          </div>
        </div>
      </header>

      {/* MODALES */}
      {showLogin && (
  <LoginModal
    onClose={() => setShowLogin(false)}
    onSwitch={() => {
      setShowLogin(false);
      setShowRegister(true);
    }}
  />
)}

{showRegister && (
  <RegisterModal
    onClose={() => setShowRegister(false)}
    onSwitch={() => {
      setShowRegister(false);
      setShowLogin(true);
    }}
  />
)}
    </>
  );
}
