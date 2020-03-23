import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryItem from './CategoryItem';
import { getCategories } from '../../../../actions/category';

const Categories = ({ category: { categories, loading }, getCategories }) => {
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      {loading ? (
        <p>Список категорий: </p>
      ) : (
        <Fragment>
          {categories.length > 0 ? (
            categories.map(category => (
              <CategoryItem key={category._id} category={category} />
            ))
          ) : (
            <h4>Список пуст</h4>
          )}
        </Fragment>
      )}
    </div>
  );
};

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(
  mapStateToProps,
  { getCategories }
)(Categories);
