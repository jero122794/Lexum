export default function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">LEXUM</div>
      <nav className="main-nav">
        <a href="#">Inicio</a>
        <a href="#">Soluciones</a>
        <a href="#">Precios</a>
        <a href="#">Recursos</a>
        <a href="#">Contacto</a>
      </nav>
      <div className="auth-buttons">
        <button className="login">Login</button>
        <button className="register">Registro</button>
      </div>
    </header>
  );
}