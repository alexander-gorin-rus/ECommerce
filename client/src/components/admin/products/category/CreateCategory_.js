import React, { useEffect, useState, Fragment } from 'react';
import { loadAdmin } from '../../../../actions/admin';
import { Link } from 'react-router-dom';

const CreateCategory_ = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //destructure admin in admin_token from localstorage
  const { admin, admin_token } = loadAdmin();

  const onChange = e => {
    setError('');
    setName(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
  };

  return (
    <Fragment>
      <h4 className=' mt-5'>Создать новую категорию товаров</h4>
      <form onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Название категории'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Отправить
        </button>
        <Link className='ml-3 p-2 btn btn-warning' to='/admin_dashboard'>
          Вернуться в админ панель
        </Link>
      </form>
      <h4 className=''>Список существующих категорий</h4>
    </Fragment>
  );
};

export default CreateCategory_;
