import React from 'react';
import PropTypes from 'prop-types';

const DinamicCategories = ({
  match: {
    params: { name }
  }
}) => {
  return <div>{name}</div>;
};

DinamicCategories.propTypes = {};

export default DinamicCategories;
