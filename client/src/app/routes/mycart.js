import { useEffect } from 'react';
import { connect } from "react-redux";
import { cartUpdate, cartDelete, cartReset } from '../../actions';

const MyCart = ({ carts, cartUpdate, cartDelete, cartReset }) => {
  return (
    <>
      <h1 className="text-center py-4">
        <span className="border-bottom border-2 border-primary">My Cart</span>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" colspan="2">Detail</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Total</th>
            <th scope="col" width="47"></th>
          </tr>
        </thead>
        <tbody>
          {carts.map((cart, index) => <CartItem key={index} cartItem={cart} cartUpdate={cartUpdate} cartDelete={cartDelete} />)}
        </tbody>
      </table>
    </>
  );
}


const CartItem = ({ cartItem, cartDelete, cartUpdate, ...props }) => {
  const { product, qty } = cartItem;

  const handleCartDelete = () => {
    cartDelete({ product });
  }

  return (
    <tr>
      <td style={{width:171}}><img className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="147" height="107" src={product.image} alt="" /></td>
      <td>{product.title}</td>
      <td>
        <span className="text-danger h5">฿{product.price.toLocaleString()}</span><span className="text-muted">/piece</span>
      </td>
      <td>
        <span>x {qty.toLocaleString()}</span>
      </td>
      <td></td>
      <td>
        <button className="btn btn-danger btn-sm rounded-circle" type="button" onClick={handleCartDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}

const mapStateToProps = ({ cart: { carts } }) => {
  return { carts };
};

export default connect(
  mapStateToProps,
  { cartUpdate, cartDelete, cartReset }
)(MyCart);