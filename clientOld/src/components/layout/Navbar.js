import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import { logoutAdmin } from '../../actions/admin';
import { logoutConsumer } from '../../actions/consumer';
import { getCategories } from '../../actions/category';
import NavbarCategoryItem from './NavbarCategoryItem';

const Navbar = ({
  consumer: { consumerAuthenticated, consumerLoading },
  logoutConsumer,
  getCategories,
  category: { categories }
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleChange = e => {
    //setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
  };

  // const consumerLinks = (
  //   <div>
  //     <ul className='nav nav-tabs bg-primary'>
  //       <li className='nav-item'>
  //         <a href='#!' onClick={logoutConsumer}>
  //           <i className='fas fa-sign-out-alt'></i> Выйти
  //         </a>
  //       </li>
  //       <div
  //         className='dropdown  d-flex justify-content-end'
  //         style={{ zIndex: 100 }}
  //       >
  //         <button
  //           className='btn btn-light dropdown-toggle'
  //           type='button'
  //           id='dropdownMenuButton'
  //           data-toggle='dropdown'
  //           aria-haspopup='true'
  //           aria-expanded='false'
  //         >
  //           Категории товаров
  //         </button>
  //         <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
  //           <Link className='dropdown-item' to='#'>
  //             Action
  //           </Link>
  //           <Link className='dropdown-item' to='#'>
  //             Another action
  //           </Link>
  //           <Link className='dropdown-item' to='#'>
  //             Something else here
  //           </Link>
  //         </div>
  //         <li>
  //           <Link onClick={logoutConsumer} to='#!'>
  //             <i className='fas fa-sign-out-alt'></i>{' '}
  //             <span className='hide-sm'>Выйти</span>
  //           </Link>
  //         </li>
  //       </div>
  //     </ul>
  //   </div>
  // );

  const guestLinks = (
    <div>
      <ul className='nav nav-tabs bg-primary'>
        <li className='nav-item'>
          <Link className='nav-link text-light' to='/'>
            Главная
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link text-light' to='/signup'>
            Зарегистрироваться
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link text-light' to='/signin'>
            Войти
          </Link>
        </li>
        <div
          className='dropdown  d-flex justify-content-end'
          style={{ zIndex: 100 }}
        >
          <select className='btn btn-light dropdown-toggle'>
            <option>Категории товаров</option>
            {categories.map(category => (
              <NavbarCategoryItem key={category.id_1} category={category} />
            ))}
          </select>
        </div>
      </ul>
    </div>
  );
  // {
  //   !consumerLoading && (
  //     <Fragment>{consumerAuthenticated ? consumerLinks : guestLinks}</Fragment>
  //   );
  // }
  return <nav>{guestLinks}</nav>;
};

Navbar.propTypes = {
  // logoutAdmin: PropTypes.func.isRequired,
  // admin: PropTypes.object.isRequired,
  consumer: PropTypes.object.isRequired,
  logoutConsumer: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  consumer: state.consumer,
  category: state.category
});

export default connect(
  mapStateToProps,
  { logoutConsumer, getCategories }
)(Navbar);
