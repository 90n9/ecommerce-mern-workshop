import { useState } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { orderCreate } from '../../actions';

const numberFormat = (number) => number.toLocaleString('en-US', { style: 'currency', currency: 'THB', currencyDisplay: 'narrowSymbol' });

const Order = ({ carts, order, ...props }) => {
  const [shipping_name, setShippingName] = useState('');
  const [shipping_mobile, setShippingMobile] = useState('');
  const [shipping_address, setShippingAddress] = useState('');

  const handleSubmitOrder = () => {
    const products_price = carts.map(item => item.product.price * item.qty).reduce((a, b) => a + b, 0);
    const tax_price = products_price * 0.07;
    const total_price = products_price * 1.07;
    props.orderCreate({
      products_price,
      tax_price,
      total_price,
      shipping_name,
      shipping_address,
      shipping_mobile,
      products: carts.map(item => {
        return {
          id: item.product.id,
          price: item.product.price,
          qty: item.qty
        }
      })
    });
  }
  return (
    <>
      <h1 className="text-center py-4">
        <span className="border-bottom border-2 border-primary">Checkout</span>
      </h1>
      {order.status === "success" && (
        <>
          <div className="text-center">
          <h2 className="display-3 py-4">Complete!</h2>
          <div className="text-muted py-2">Your order id :</div>
          <div className="text-success h3 py-2">{order.order.id}</div>
          <Link to="/" className="btn btn-dark mt-4">Back to home</Link>
          </div>
        </>
      )}
      {order.status !== "success" && (
        <div className="row">
          {order.status === "error" && (
            <div className="col-12">
              <div class="alert alert-danger" role="alert">
                {order.msg}
            </div>
            </div>
          )}
          <div className="col-md-4">
            <CartList carts={carts} />
          </div>
          <div className="col-md-8">
            <div class="card border-primary mb-3">
              <div class="card-header bg-primary border-primary text-light">Shipping Information</div>
              <div class="card-body">
                <div className="mb-3">
                  <label htmlFor="shipping-name" className="form-label">Contact Name</label>
                  <input type="text" className="form-control" name="shipping-name" id="shipping-name" value={shipping_name} onChange={(e) => setShippingName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="shipping-mobile" className="form-label">Mobile Number</label>
                  <input type="text" className="form-control" name="shipping-mobile" id="shipping-mobile" value={shipping_mobile} onChange={(e) => setShippingMobile(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="shipping-address" className="form-label">Shipping Address</label>
                  <textarea name="shipping-address" id="shipping-address" rows="3" className="form-control" value={shipping_address} onChange={(e) => setShippingAddress(e.target.value)} />
                </div>
                <div class="d-flex justify-content-between py-1">
                  <Link to="/mycart" className="btn btn-dark">Back</Link>
                  <button type="button" className="btn btn-primary" onClick={handleSubmitOrder}>
                    Submit Order
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const CartList = ({ carts }) => {
  const productsPrice = carts.map(cart => cart.product.price * cart.qty).reduce((a, b) => a + b, 0);
  const taxPrice = productsPrice * 0.07;
  const totalPrice = productsPrice + taxPrice;

  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col" colspan="2">Detail</th>
          <th scope="col" width="40" className="text-end">Qty</th>
          <th scope="col" width="100" className="text-end">Total</th>
        </tr>
      </thead>
      <tbody>
        {carts.map((cart, index) => <CartItem key={index} cartItem={cart} />)}
        <tr>
          <th className="text-end" scope="row" colspan="3">Total product price</th>
          <td className="text-end">{numberFormat(productsPrice)}</td>
        </tr>
        <tr>
          <th className="text-end" scope="row" colspan="3">7% TAX</th>
          <td className="text-end">{numberFormat(taxPrice)}</td>
        </tr>
        <tr className=" border-3">
          <th className="text-end" scope="row" colspan="3">Total</th>
          <td className="text-end text-danger h4">{numberFormat(totalPrice)}</td>
        </tr>
      </tbody>
    </table>
  )
}


const CartItem = ({ cartItem, ...props }) => {
  const { product, qty } = cartItem;

  return (
    <tr>
      <td style={{ width: 42 }}><img className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="37" height="27" src={product.image} alt="" /></td>
      <td>
        <div>{product.title}</div>
        <span className="text-danger">฿{product.price.toLocaleString()}</span><span className="text-muted">/piece</span>
      </td>
      <td className="text-end">{qty.toLocaleString()}</td>
      <td className="text-danger text-end">
        ฿{(product.price * qty).toLocaleString()}
      </td>
    </tr>
  );
}

const mapStateToProps = ({ cart: { carts }, order }) => {
  return { carts, order };
};

export default connect(
  mapStateToProps,
  { orderCreate }
)(Order);