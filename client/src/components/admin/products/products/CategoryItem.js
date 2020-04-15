import React from 'react';

const CategoryItem = ({ category: { name, _id } }) => {
  return <option>{name}</option>;
};

export default CategoryItem;
