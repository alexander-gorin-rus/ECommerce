import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCategory } from '../../../../actions/category';

const CategoryItem = ({ category: { _id, name }, deleteCategory }) => {
  return (
    <Fragment>
      <p className='border m-2 p-2'>
        {name}
        <button className='m-2 p-1 bg-warning rounded'>Редактировать</button>
        <button
          className='m-2 p-1 bg-danger rounded'
          onClick={e => deleteCategory(_id)}
        >
          Удалить
        </button>
      </p>
    </Fragment>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//   category: state.category
// });

export default connect(
  null,
  { deleteCategory }
)(CategoryItem);
