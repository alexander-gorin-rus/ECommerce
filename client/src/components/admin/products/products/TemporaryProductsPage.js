// import React, { useEffect, Fragment } from 'react';
// import PropTypes from 'prop-types';
// import { getProducts } from '../../../../actions/product';
// import { connect } from 'react-redux';
// import TemporaryProductsItem from './TemporaryProductsItem';

// const TemporaryProductsPage = ({ getProducts, product: { products } }) => {
//   useEffect(() => {
//     getProducts();
//   }, [getProducts]);
//   return (
//     <Fragment>
//       <div className='center-align'>
//         <TemporaryProductsItem
//           className='list-inline-item mb-3'
//           products={products}
//         />
//       </div>
//     </Fragment>
//   );
// };

// TemporaryProductsPage.propTypes = {
//   product: PropTypes.object.isRequired,
//   getProducts: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({
//   product: state.product
// });

// export default connect(
//   mapStateToProps,
//   { getProducts }
// )(TemporaryProductsPage);

import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import ImagesSlider from './ImageSlider';
import { Row, Col, Card } from 'antd';
const { Meta } = Card;

function TemporaryProductsPage() {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    axios.post('/api/products/getProducts').then(response => {
      if (response.data.success) {
        setProducts(response.data.products);
        console.log(response.data.products);
      } else {
        alert('Unable to fetch product');
      }
    });
  }, []);

  const renderCards = Products.map((product, index) => {
    return (
      <div className='container' key={index}>
        <div className='col-4'>
          {<ImagesSlider images={product.images} />}
          <Meta title={product.name} description={product.price} />
        </div>
      </div>
    );
  });
  return (
    <Fragment>
      <div style={{ width: '90%', margin: '3rem auto' }}>
        <div style={{ textAlign: 'center' }}>
          {Products.length === 0 ? (
            <div
              stle={{
                display: 'flex',
                height: '300px',
                justifyContent: 'center',
                alignItem: 'center'
              }}
            >
              <h2>В этой категории товаров не найдено</h2>
            </div>
          ) : (
            <div>
              <Row gutter={[16, 16]}>{renderCards}</Row>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center' }}></div>
        </div>
      </div>
    </Fragment>
  );
}

export default TemporaryProductsPage;
