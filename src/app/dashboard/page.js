import styles from './dashboard.module.css';

export default function DashboardHome() {
  return (
    <div className={styles.dashboard}>
      <h2 className={styles.title}>Dashboard</h2>
      <p className={styles.subtitle}>Bienvenido de nuevo, Juan</p>

      <div className={styles.overview}>
        <div className={styles.card}>
          <h3>24</h3>
          <span>Casos activos</span>
        </div>
        <div className={styles.card}>
          <h3>48</h3>
          <span>Clientes totales</span>
        </div>
        <div className={styles.card}>
          <h3>156</h3>
          <span>Documentos</span>
        </div>
        <div className={styles.card}>
          <h3>12</h3>
          <span>Eventos pendientes</span>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Casos recientes */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h4>Casos recientes</h4>
            <a href="#">Ver todos</a>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Caso</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Demanda por<br /><span>#CASO-2025-001</span></td>
                <td>Tech Solutions</td>
                <td><span className={`${styles.badge} ${styles.green}`}>En curso</span></td>
                <td>10 Jun 2023</td>
              </tr>
              <tr>
                <td>Revisión<br /><span>#CASO-2025-002</span></td>
                <td>María García</td>
                <td><span className={`${styles.badge} ${styles.yellow}`}>En revisión</span></td>
                <td>15 Jun 2023</td>
              </tr>
              <tr>
                <td>Derecho<br /><span>#CASO-2025-003</span></td>
                <td>Pedro López</td>
                <td><span className={`${styles.badge} ${styles.red}`}>Urgente</span></td>
                <td>18 Jun 2023</td>
              </tr>
              <tr>
                <td>Contrato<br /><span>#CASO-2025-004</span></td>
                <td>Ana Martínez</td>
                <td><span className={`${styles.badge} ${styles.green}`}>En curso</span></td>
                <td>20 Jun 2023</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Calendario y próximos eventos */}
        <div className={styles.side}>
          <div className={styles.calendar}>
            <div className={styles.panelHeader}>
              <h4>Calendario</h4>
              <a href="#">Ver todo</a>
            </div>
            <div className={styles.calendarBox}>
              <strong>Junio 2025</strong>
              <div className={styles.dates}>
                {[...Array(30)].map((_, i) => (
                  <div key={i} className={`${styles.date} ${i === 15 ? styles.activeDate : ''}`}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.events}>
              <strong>Próximos eventos</strong>
              <p><b>Audiencia</b> – Caso Tech Solutions</p>
              <small>16 Jun 2025, 10:00 AM</small>
            </div>
          </div>
        </div>
      </div>

      {/* Documentos recientes */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h4>Documentos recientes</h4>
          <a href="#">Ver todos</a>
        </div>
        <ul className={styles.docs}>
          <li>
            <span>📄 Contrato_Arrendamiento_MaríaGarcía.pdf</span>
            <span className={`${styles.status} ${styles.yellow}`}>Borrador</span>
          </li>
          <li>
            <span>📄 Demanda_TechSolutions.docx</span>
            <span className={`${styles.status} ${styles.green}`}>Firmado</span>
          </li>
          <li>
            <span>📄 Derecho_Peticion_PedroLópez.pdf</span>
            <span className={`${styles.status} ${styles.red}`}>Pendiente</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
