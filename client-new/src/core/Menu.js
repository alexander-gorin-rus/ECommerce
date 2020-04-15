import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#ffffff' };
  }
};

const Menu = props => {
  return (
    <div>
      <ul className='nav nav-tabs bg-primary'>
        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(props.history, '/')}
            to='/'
          >
            Главная
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(props.history, '/signin')}
            to='/signin'
          >
            Зарегистрироваться
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(props.history, '/signup')}
            to='/signup'
          >
            Войти
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
