import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProduct } from '../../../../actions/product';
import { getCategories } from '../../../../actions/category';
import { setAlert } from '../../../../actions/alert';

const CreateProduct = ({ addProduct, getCategories }) => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    volume: '',
    price: '',
    photo: '',
    quantity: '',
    category: '',
    categories: [],
    formData: ''
  });

  const {
    name,
    description,
    volume,
    price,
    category,
    categories,
    quantity,
    formData
  } = values;

  const init = () => {
    getCategories().then(data => {
      setValues({ ...values, categories: data, formData: new FormData() });
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values });

    addProduct({ formData });
  };
  return (
    <Fragment>
      <h2 className='text-center'>Форма создания продукта</h2>
      <form onSubmit={clickSubmit}>
        <div className='form-group'>
          <label className='btn btn-secondary'>
            {' '}
            Загрузить фото{' '}
            <input
              onChange={handleChange('photo')}
              type='file'
              name='photo'
              accept='/image/*'
            />
          </label>
        </div>
        <div className='form-group'>
          <label>Название продукта</label>
          <input
            onChange={handleChange('name')}
            type='text'
            className='form-control'
            value={name}
          />
        </div>
        <div className='form-group'>
          <label>Описание продукта</label>
          <textarea
            onChange={handleChange('description')}
            className='form-control'
            value={description}
          />
        </div>
        <div className='form-group'>
          <label>Объем тары</label>
          <input
            onChange={handleChange('volume')}
            type='number'
            className='form-control'
            value={volume}
          />
        </div>
        <div className='form-group'>
          <label>Цена</label>
          <input
            onChange={handleChange('price')}
            type='number'
            className='form-control'
            value={price}
          />
        </div>
        <div className='form-group'>
          <label>Количество</label>
          <input
            onChange={handleChange('quantity')}
            type='number'
            className='form-control'
            value={quantity}
          />
        </div>
        <div className='form-group'>
          <label>Категория</label>
          <select
            onChange={handleChange('categories')}
            className='form-control'
          >
            <option>Выбрать категорию</option>
            {categories &&
              categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
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

CreateProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired
};

export default connect(
  null,
  { addProduct, getCategories }
)(CreateProduct);
