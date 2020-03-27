import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAdmin } from '../../../actions/admin';
import { setAlert } from '../../../actions/alert';

const Login = ({ loginAdmin, isAuthenticated, setAlert }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    loginAdmin(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/admin_dashboard' />;
  }

  return (
    <div className='admin-panel'>
      <div className='admin-form'>
        <h1>Войти в админ</h1>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={e => onChange(e)}
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
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.admin.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loginAdmin, setAlert }
)(Login);
