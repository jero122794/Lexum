export default function Pricing() {
  return (
    <section className="pricing">
      <h2>Planes adaptados a tus necesidades</h2>
      <div className="pricing-cards">
        <div className="card">
          <h3>Plan Individual</h3>
          <p>$99 / mes</p>
          <ul>
            <li>Asistente legal IA</li>
            <li>Gestión de documentos</li>
            <li>Calendario básico</li>
            <li>1 usuario</li>
          </ul>
          <button>Seleccionar plan</button>
        </div>
        <div className="card popular">
          <h3>Plan Despacho</h3>
          <p>$199 / mes</p>
          <ul>
            <li>Todo del plan individual</li>
            <li>Gestión de clientes y casos</li>
            <li>Calendario avanzado</li>
            <li>Hasta 5 usuarios</li>
            <li>Roles y permisos</li>
          </ul>
          <button>Seleccionar plan</button>
        </div>
        <div className="card">
          <h3>Plan Corporativo</h3>
          <p>$399 / mes</p>
          <ul>
            <li>Todo del plan despacho</li>
            <li>Usuarios ilimitados</li>
            <li>API personalizada</li>
            <li>Soporte prioritario</li>
          </ul>
          <button>Contactar ventas</button>
        </div>
      </div>
    </section>
  );
}