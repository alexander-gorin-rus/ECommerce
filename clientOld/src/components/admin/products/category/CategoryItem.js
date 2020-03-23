import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { getCategories } from '../../../../actions/category';

const CategoryItem = () => {
  return (
    <div>
      <p>Категория:</p>
    </div>
  );
};

CategoryItem.propTypes = {
  //   category: PropTypes.object.isRequired,
  //   getCategories: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//   category: state.category
// });

// export default connect(
//   mapStateToProps,
//   { getCategories }
// )(CategoryItem);

export default CategoryItem;
