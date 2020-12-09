import ProductItem from './ProductItem';

function ProductList({productList, cartAdd}) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      {productList.map((product, index) => <ProductItem key={index} product={product} cartAdd={cartAdd} />)}
    </div>
  );
}

export default ProductList;