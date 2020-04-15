import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteName } from '../../../actions/companyName';

const CompanyNameItem = ({ deleteName, compName: { name, _id } }) => {
  return (
    <Fragment>
      <div className='border d-flex'>
        <h6>{name}</h6>
        <button
          className='m-2 p-1 bg-danger rounded '
          onClick={e => deleteName(_id)}
        >
          Удалить
        </button>
      </div>
    </Fragment>
  );
};

CompanyNameItem.propTypes = {
  name: PropTypes.object,
  deleteName: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteName }
)(CompanyNameItem);
