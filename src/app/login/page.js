'use client';
import styles from './Login.module.css';

export default function LoginModal({ onClose, onSwitch }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Imagen izquierda */}
        <div className={styles.imageSide}>
          <img src="/8304.jpg" alt="Login visual" />
        </div>

        {/* Formulario */}
        <div className={styles.formSide}>
          <button className={styles.close} onClick={onClose}>×</button>
          <span className={styles.offer}>¡Bienvenido de nuevo!</span>
          <h1 className={styles.title}>Iniciar sesión</h1>
          <p className={styles.description}>
            Accede a tu cuenta para gestionar tus casos y documentos legales con Lexum.
          </p>

          <form className={styles.form}>
            <input type="email" placeholder="Correo electrónico" required />
            <input type="password" placeholder="Contraseña" required />
            <button type="submit">Ingresar</button>
          </form>

          <p className={styles.legal}>
            ¿No tienes cuenta?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSwitch(); // Cambia a registro
              }}
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
