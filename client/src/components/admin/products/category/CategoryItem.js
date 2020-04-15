import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCategory, setCurrent } from '../../../../actions/category';

const CategoryItem = ({ category: { _id, name }, deleteCategory }) => {
  return (
    <Fragment>
      <div className=' d-flex'>
        <h6 className='px-3 py-3'> {name}</h6>
        <button
          className='m-2 p-1 bg-danger rounded '
          onClick={e => deleteCategory(_id)}
        >
          Удалить
        </button>
      </div>
    </Fragment>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//   category: state.category
// });

export default connect(
  null,
  { deleteCategory, setCurrent }
)(CategoryItem);
