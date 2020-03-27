import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutAdmin } from '../../../actions/admin';

const AddProducts = ({ logoutAdmin }) => {
  return (
    <Fragment>
      <h3 className='text-center pt-1'>Добро пожаловать в админ панель</h3>
      <form>
        <div className='form-row'>
          <div className='col'>
            <p type='text-center' className='form-control'>
              <Link to='create_category'>Создать категорию</Link>
            </p>
          </div>
          <div className='col'>
            <p type='text' className='form-control'>
              <Link to='create_product'>Создать продукт</Link>
            </p>
          </div>
        </div>
      </form>
      <div onClick={logoutAdmin} className='text-light bg-danger p-1'>
        <p className='text-center pointer'>Выйти из админ панели</p>
      </div>
    </Fragment>
  );
};

AddProducts.propTypes = {
  logoutAdmin: PropTypes.func.isRequired
};

export default connect(
  null,
  { logoutAdmin }
)(AddProducts);
