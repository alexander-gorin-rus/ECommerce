import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutAdmin } from '../../../actions/admin';

const AddProducts = ({ logoutAdmin }) => {
  return (
    <Fragment>
      <form>
        <h3 className=' pt-1'>Добро пожаловать в админ панель</h3>
        <div className='form-row'>
          <div className='col-4'>
            <p type='text-center' className='form-control'>
              <Link to='create_name'>Создать название компании</Link>
            </p>
          </div>
          <div className='col-4'>
            <p type='text-center' className='form-control'>
              <Link to='create_text'>Создать текст о компании</Link>
            </p>
          </div>
          <div className='col-4'>
            <p type='text-center' className='form-control'>
              <Link to='create_category'>Создать категорию</Link>
            </p>
          </div>
          <div className='col-4'>
            <p type='text' className='form-control'>
              <Link to='create_product'>Создать продукт</Link>
            </p>
          </div>
          <div className='col-4'>
            <p type='text' className='form-control'>
              <Link to='create_partner'>Создать партнера</Link>
            </p>
          </div>
        </div>
      </form>
      <div onClick={logoutAdmin} className='text-light bg-danger p-1'>
        <p className=' pointer'>Выйти из админ панели</p>
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
