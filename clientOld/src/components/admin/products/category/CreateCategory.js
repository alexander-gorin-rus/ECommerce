import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryItem from './CategoryItem';
import { createCateg, getCategories } from '../../../../actions/category';
import { setAlert } from '../../../../actions/alert';

const CreateCategory = ({
  createCateg,
  setAlert,
  getCategories,
  category: { categories, category }
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

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
      <h2 className='text-center'>Создать новую категорию товаров</h2>
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
      <h2 className='text-center'>Список существующих категорий</h2>
      <div className='d-flex'>
        <div style={{ backgroundColor: '#B1EED0' }}>
          {categories.map(category => (
            <CategoryItem
              className='list-inline-item mb-3'
              key={category._id}
              category={category}
              style={{ marginBottom: '20px', border: '2px solid black' }}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

CreateCategory.propTypes = {
  createCateg: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(
  mapStateToProps,
  { createCateg, setAlert, getCategories }
)(CreateCategory);
