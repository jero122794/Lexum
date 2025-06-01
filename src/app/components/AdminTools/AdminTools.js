'use client';
import styles from './AdminTools.module.css';
import { BiUser, BiShield, BiBarChartAlt2 } from 'react-icons/bi';

export default function AdminTools() {
  return (
    <section className={styles.adminTools}>
      <div className={styles.grid}>
        {/* GRANDE a la izquierda */}
        <div className={`${styles.card} ${styles.main}`}>
          <img src="/8304.jpg" alt="Usuarios" className={styles.bgImage} />
          <div className={styles.overlay}>
            <h3>Gestión de usuarios</h3>
            <p>Crea y administra cuentas para todos los miembros de tu despacho legal.</p>
          </div>
        </div>

        {/* STACK derecho */}
        <div className={styles.rightColumn}>
          <div className={`${styles.card} ${styles.small}`}>
            <img src="/8304.jpg" alt="Roles" className={styles.bgImage} />
            <div className={styles.overlay}>
              <h4>Roles y permisos</h4>
              <p>Define roles personalizados con permisos específicos para cada tipo de usuario.</p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.small}`}>
            <img src="/8304.jpg" alt="Informes" className={styles.bgImage} />
            <div className={styles.overlay}>
              <h4>Informes y analíticas</h4>
              <p>Visualiza el rendimiento de tu equipo y la actividad de la plataforma.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
