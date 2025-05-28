import styles from './Navbar.module.css'; // <-- MUY IMPORTANTE

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>LEXUM</div>
      <nav className={styles.mainNav}>
        <a href="#">Inicio</a>
        <a href="#">Soluciones</a>
        <a href="#">Precios</a>
        <a href="#">Recursos</a>
        <a href="#">Contacto</a>
      </nav>
      <div className={styles.authButtons}>
        <button className={styles.login}>Login</button>
        <button className={styles.register}>Registro</button>
      </div>
    </header>
  );
}
