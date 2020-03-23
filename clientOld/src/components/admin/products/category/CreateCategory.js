import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Categories from './Categories';
import { createCateg, getCategories } from '../../../../actions/category';
import { setAlert } from '../../../../actions/alert';

const CreateCategory = ({ createCateg, setAlert, getCategories }) => {
  const [form, setForm] = useState({
    name: ''
  });

  const { name } = form;

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (name == '') {
      setAlert('Поле не должно быть пустым', 'danger');
    } else {
      createCateg({ name });
    }
  };

  return (
    <Fragment>
      <h2 className='text-center'>Форма создания категории товаров</h2>
      {/* <Fragment>
        <div>
          Список категорий: <br />
          <Categories />
        </div>
      </Fragment> */}
      <form onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
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
    </Fragment>
  );
};

CreateCategory.propTypes = {
  createCateg: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  categoty: PropTypes.object
};

export default connect(
  null,
  { createCateg, setAlert }
)(CreateCategory);
