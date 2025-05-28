export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-info">
        <h3>LEXUM</h3>
        <p>Plataforma integral para profesionales legales que combina IA con gestión avanzada.</p>
      </div>
      <div className="footer-links">
        <div>
          <h4>Producto</h4>
          <ul>
            <li>Asistente IA</li>
            <li>Gestión de documentos</li>
            <li>Calendario</li>
            <li>Gestión de clientes</li>
          </ul>
        </div>
        <div>
          <h4>Empresa</h4>
          <ul>
            <li>Sobre nosotros</li>
            <li>Equipo</li>
            <li>Carreras</li>
          </ul>
        </div>
      </div>
      <div className="footer-social">
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">LinkedIn</a>
      </div>
    </footer>
  );
}
