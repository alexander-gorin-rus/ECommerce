import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginConsumer } from '../../actions/consumer';
import { setAlert } from '../../actions/alert';

const Signin = ({ loginConsumer, consumerAuthenticated, setAlert }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    loginConsumer(email, password);
  };

  if (consumerAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h2 className='text-center'>Форма авторизации клиента</h2>
      <form onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <label className='text-muted'>Email</label>
          <input
            type='text'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Пароль</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            required
            className='form-control'
          />
        </div>

        <input
          type='submit'
          className='btn btn-primary'
          value='Авторизоваться'
        />
      </form>
    </Fragment>
  );
};

Signin.propTypes = {
  loginConsumer: PropTypes.func.isRequired,
  consumerAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  consumerAuthenticated: state.consumer.consumerAuthenticated
});

export default connect(
  mapStateToProps,
  { loginConsumer, setAlert }
)(Signin);
