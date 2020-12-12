import { useState } from 'react';

const ProductItem = ({ product, cartAdd, ...props }) => {
  const [qty, setQty] = useState(1);

  const handleInputChange = e => {
    setQty(e.target.value);
  }

  const handleAddToCart = () => {
    cartAdd({ product, qty: parseInt(qty) });
    setQty(1);
  }

  return (
    <div className="col">
      <div className="card shadow-sm">
        <img className="bd-placeholder-img card-img-top" src={product.image} alt="" />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text text-muted"><span className="text-danger fs-4">฿{product.price.toLocaleString()}</span>/piece</p>
          <div className="d-flex">
            <div className="input-group">
              <input type="number" className="form-control" placeholder="Quantity" aria-label="Quantity" value={qty} onChange={handleInputChange} />
              <button className="btn btn-outline-primary" type="button" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ProductItem;