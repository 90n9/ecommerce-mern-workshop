import { useEffect } from 'react';
import { connect } from "react-redux";
import ProductList from '../../components/product/ProductList';
import { productsFetch, cartAdd } from '../../actions';

function Home(props) {
  useEffect(() => {
    props.productsFetch();
  }, []);

  return (
    <>
      <h1 className="text-center py-4">
        <span className="border-bottom border-2 border-primary">Our Products</span>
      </h1>
      <ProductList productList={props.products} cartAdd={props.cartAdd} />
    </>
  );
}

const mapStateToProps = ({ product: { products } }) => {
  return { products };
};

export default connect(
  mapStateToProps,
  { productsFetch, cartAdd }
)(Home);