import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { updateCategory } from '../../../../actions/category';
import { connect } from 'react-redux';

const CategoryUpdate = ({ category: { _id, name }, updateCategory }) => {
  return (
    <Fragment>
      <div className='text-center'>{`Изменить категорию ${name}`}</div>
      <p>{name}</p>
      <p>{_id}</p>
    </Fragment>
  );
};

CategoryUpdate.propTypes = {
  category: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(
  mapStateToProps,
  updateCategory
)(CategoryUpdate);
