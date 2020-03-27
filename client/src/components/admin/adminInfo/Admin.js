import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { regAdmin } from '../../../actions/admin';
import { setAlert } from '../../../actions/alert';

const Admin = ({ setAlert, regAdmin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('пароль повторно введен неверно', 'danger');
    } else {
      regAdmin({ name, email, password });
      setAlert('Админ успешно зарегистрирован', 'success');
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/admin_dashboard' />;
  }

  return (
    <div className='admin-panel'>
      <div className='admin-form'>
        <p className='text'>
          Макс привет, чтобы твоя админка заработала, тебе нужно сначала
          зарегистрироваться.
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
              minLength='6'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              value={password2}
              onChange={e => onChange(e)}
              minLength='6'
              required
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
      </div>
    </div>
  );
};

Admin.propTypes = {
  setAlert: PropTypes.func.isRequired,
  regAdmin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.admin.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, regAdmin }
)(Admin);
