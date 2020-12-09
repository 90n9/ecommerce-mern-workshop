import { Link } from "react-router-dom";
import CartMenu from './CartMenu';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <div className="container">
          <Link to="/" className="navbar-brand">E-Commerce</Link>
          <CartMenu />
        </div>
      </nav>
    </header>
  );
}

export default Header;