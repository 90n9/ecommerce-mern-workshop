import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { cartDelete } from '../../actions';

const CartMenu = ({ carts, cartDelete }) => {
  const totalPrice = carts.map(cart => cart.product.price * cart.qty).reduce((a, b) => a + b, 0);
  const totalQty = carts.map(cart => cart.qty).reduce((a, b) => a + b, 0);
  return (
    <div className="btn-group">
      <div className="p-2 text-light">
        ฿ {totalPrice.toLocaleString()}
      </div>
      <button type="button" className="btn btn-light rounded-circle" data-bs-toggle="dropdown" aria-expanded="false">
        <div className="text-primary py-1">
          <i className="fas fa-shopping-basket"></i>
        </div>
        <span className="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-danger">{totalQty.toLocaleString()}</span>
      </button>
      <div className="dropdown-menu dropdown-menu-end mt-1 p-4 text-muted">
        <div style={{ minWidth: 240 }}>
          {carts.map((cartItem, index) => <CartItem key={index} cartItem={cartItem} cartDelete={cartDelete} />)}
        </div>
        <div className="my-2">
          <div className="d-flex justify-content-between">
            <span>Total Price</span>
            <span className="text-danger">
              ฿{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="d-grid my-2">
          <Link to="/mycart" className="btn btn-primary">
            My Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

const CartItem = ({ cartItem, cartDelete, ...props }) => {
  const { product, qty } = cartItem;

  const handleCartDelete = () => {
    cartDelete({ product });
  }

  return (
    <div className="d-flex text-muted pt-3">
      <img className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="56" height="40" src={product.image} alt="" />
      <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
        <div className="d-flex justify-content-between">
          <strong className="text-gray-dark">{product.title}</strong>
          <span>x {qty.toLocaleString()}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="d-block"><span className="text-danger">฿{product.price.toLocaleString()}</span>/piece</span>
          <button className="btn btn-danger btn-sm rounded-circle" type="button" onClick={handleCartDelete}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ cart: { carts } }) => {
  return { carts };
};

export default connect(
  mapStateToProps,
  { cartDelete }
)(CartMenu);