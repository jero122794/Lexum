'use client';
import styles from './Register.module.css';

export default function Register({ onClose, onSwitch }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Imagen izquierda */}
        <div className={styles.imageSide}>
          <img src="/8304.jpg" alt="Visual Registro" />
        </div>

        {/* Formulario */}
        <div className={styles.formSide}>
          <button className={styles.close} onClick={onClose}>×</button>
          <span className={styles.offer}>Crea tu cuenta</span>
          <h1 className={styles.title}>Regístrate en Lexum</h1>
          <p className={styles.description}>
            Únete a cientos de profesionales legales que ya gestionan su trabajo con inteligencia.
          </p>

          <form className={styles.form}>
            <input type="text" placeholder="Nombre completo" required />
            <input type="email" placeholder="Correo electrónico" required />
            <input type="password" placeholder="Contraseña" required />
            <button type="submit">Registrarse</button>
          </form>

          <p className={styles.legal}>
            ¿Ya tienes cuenta?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSwitch(); // cambia a modal de login
              }}
            >
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
