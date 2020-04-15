import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteText } from '../../../actions/textAboutCompany';

const CompanyTextItem = ({ deleteText, textName: { text, _id } }) => {
  return (
    <Fragment>
      <div className='border d-flex'>
        <h6>{text}</h6>
      </div>
      <button
        className='m-2 p-1 bg-danger rounded '
        onClick={e => deleteText(_id)}
      >
        Удалить
      </button>
    </Fragment>
  );
};

CompanyTextItem.propTypes = {
  text: PropTypes.object,
  deleteText: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteText }
)(CompanyTextItem);
