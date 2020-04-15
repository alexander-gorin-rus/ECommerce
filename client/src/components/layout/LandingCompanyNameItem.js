import React from 'react';
import PropTypes from 'prop-types';

const LandingCompanyNameItem = ({ compName: { name } }) => {
  return <h1 className='px-5 py-3 company-name'>{name}</h1>;
};

LandingCompanyNameItem.propTypes = {
  textName: PropTypes.object
};

export default LandingCompanyNameItem;
