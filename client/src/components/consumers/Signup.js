import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { regConsumer } from '../../actions/consumer';
import { setAlert } from '../../actions/alert';

const Signup = ({ setAlert, regConsumer, consumerAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('пароль повторно введен неверно', 'danger');
    } else {
      regConsumer({ name, email, password });
    }
  };

  if (consumerAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h2 className='text-center'>Форма регистрации клиента</h2>
      <form onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <label className='text-muted'>Имя</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
            className='form-control'
          />
        </div>
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
        <div className='form-group'>
          <label className='text-muted'>Повторить пароль</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
            required
            className='form-control'
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary'
          value='Зарегистрироваться'
        />
      </form>
    </Fragment>
  );
};

Signup.propTypes = {
  regConsumer: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  consumerAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  consumerAuthenticated: state.consumer.consumerAuthenticated
});

export default connect(
  mapStateToProps,
  { regConsumer, setAlert }
)(Signup);
