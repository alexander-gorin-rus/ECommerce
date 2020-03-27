import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const NavbarCategoryItem = ({ category: { name } }) => {
  return <option>{name}</option>;
};

NavbarCategoryItem.propTypes = {
  category: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//   category: state.category
// });

export default connect(null)(NavbarCategoryItem);
