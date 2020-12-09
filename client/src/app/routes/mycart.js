import { useState } from 'react';
import { connect } from "react-redux";
import { cartUpdate, cartDelete, cartReset } from '../../actions';

const MyCart = ({ carts, cartUpdate, cartDelete, cartReset }) => {
  return (
    <>
      <h1 className="text-center py-4">
        <span className="border-bottom border-2 border-primary">My Cart</span>
      </h1>
      <div className="row">
        <div className="col-md-8">
          <CartList carts={carts} cartUpdate={cartUpdate} cartDelete={cartDelete} />
          <div className="text-end">
            <button type="button" className="btn btn-danger" onClick={cartReset}><i className="fas fa-trash"></i> Clear Cart</button>
          </div>
        </div>
        <div className="col-md-4">
          <div class="card border-primary mb-3">
            <div class="card-header bg-transparent border-primary text-primary">Price Summary</div>
            <div class="card-body">
              <button type="button" className="btn btn-primary">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CartList = ({ carts, cartUpdate, cartDelete }) => {
  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col" colspan="2">Detail</th>
          <th scope="col" className="text-end">Price</th>
          <th scope="col" width="100" className="text-end">Qty</th>
          <th scope="col" width="120" className="text-end">Total</th>
          <th scope="col" width="47"></th>
        </tr>
      </thead>
      <tbody>
        {carts.map((cart, index) => <CartItem key={index} cartItem={cart} cartUpdate={cartUpdate} cartDelete={cartDelete} />)}
      </tbody>
    </table>
  )
}


const CartItem = ({ cartItem, cartDelete, cartUpdate, ...props }) => {
  const { product, qty } = cartItem;
  const [newQty, setNewQty] = useState(qty);

  const handleCartDelete = () => {
    cartDelete({ product });
  }

  const handleInputChange = e => {
    setNewQty(e.target.value);
    cartUpdate({ product, qty: parseInt(e.target.value) });
  }

  return (
    <tr>
      <td style={{ width: 171 }}><img className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="147" height="107" src={product.image} alt="" /></td>
      <td>{product.title}</td>
      <td className="text-end">
        <span className="text-danger h5">฿{product.price.toLocaleString()}</span><span className="text-muted">/piece</span>
      </td>
      <td>
        <input type="text" className="form-control text-end" style={{ width: 80 }} placeholder="Quantity" aria-label="Quantity" value={newQty} onChange={handleInputChange} />
      </td>
      <td className="text-danger h5 text-end">
        ฿{(product.price * qty).toLocaleString()}
      </td>
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