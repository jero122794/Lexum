export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <span className="tag">PLATAFORMA LEGAL INTEGRAL</span>
        <h1>Gestión legal inteligente para profesionales</h1>
        <p>
          Lexum combina IA avanzada con herramientas de gestión para optimizar todos los aspectos
          de tu práctica legal: consultas, documentos, citas y más.
        </p>
        <div className="hero-actions">
          <button className="primary">Comenzar ahora</button>
          <button className="secondary">Ver demo</button>
        </div>
      </div>
      <div className="hero-image">
        <img src="/images/dashboard.png" alt="Dashboard Legal" />
      </div>
    </section>
  );
}