import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCategory, setCurrent } from '../../../../actions/category';

const CategoryItem = ({
  category: { _id, name },
  category,
  deleteCategory,
  setCurrent
}) => {
  return (
    <Fragment>
      <p className='border'>
        {name}
        {'  '}
        <a
          className='waves-effect waves-light btn modal-trigger'
          href='#edit-category-modal'
          onClick={() => setCurrent(category)}
        >
          Редактировать
        </a>
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
