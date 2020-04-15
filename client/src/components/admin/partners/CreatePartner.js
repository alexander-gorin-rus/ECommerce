import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AddPartner = props => {
  const handleFile = e => {
    console.log(e.target.files);
    console.log(e.target.files[0]);
  };

  return (
    <Fragment>
      <h2 className='my-5'>Форма добавления партнера</h2>
      <form>
        <div className='form-group'>
          <label className='btn btn-primary'>
            {' '}
            Загрузить фото{' '}
            <input
              type='file'
              name='photo'
              accept='/image/*'
              onChange={e => handleFile(e)}
            />
          </label>
        </div>
        {/* <div className='form-group'>
          <label>Название копании партнера </label>
          <input type='text' className='form-control' />
        </div>
        <div className='form-group'>
          <label>Информация о партнере </label>
          <textarea className='form-control' />
        </div>
        <div className='form-group'>
          <label>Адрес партнера </label>
          <input type='text' className='form-control' />
        </div>
        <div className='form-group'>
          <label>Телефон партнера </label>
          <input type='text' className='form-control' />
        </div> */}
        <Link className='ml-3 p-2 btn btn-warning' to='/admin_dashboard'>
          Вернуться в админ панель
        </Link>
      </form>
    </Fragment>
  );
};

AddPartner.propTypes = {};

export default AddPartner;
