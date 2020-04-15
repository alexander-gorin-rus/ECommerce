import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createText, getTexts } from '../../../actions/textAboutCompany';
import Preloader from '../../layout/Preloader';
import { connect } from 'react-redux';
import { setAlert } from '../../../actions/alert';
import CompanyTextItem from './CompanyTextItem';

const CompanyText = ({
  setAlert,
  createText,
  getTexts,
  textAboutCompany: { texts }
}) => {
  useEffect(() => {
    getTexts();
  }, [getTexts]);

  const [form, setForm] = useState({
    text: ''
  });

  const { text } = form;

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (text == '') {
      setAlert('Поле не должно быть пустым', 'danger');
    } else {
      createText({ text });
      setForm({
        text: ''
      });
    }
  };
  return (
    <Fragment>
      <h4 className=' mt-5'>Создать текст о компании</h4>
      <form onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <textarea
            className='form-control'
            name='text'
            value={text}
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
      <h4 className='text-center'>Существующий текст</h4>
      <div>
        {texts.map(textName => (
          <CompanyTextItem
            className='list-inline-item mb-3'
            key={textName._id}
            textName={textName}
          />
        ))}
      </div>
    </Fragment>
  );
};

CompanyText.propTypes = {
  getTexts: PropTypes.func.isRequired,
  createText: PropTypes.func.isRequired,
  textAboutCompany: PropTypes.object,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  textAboutCompany: state.textAboutCompany
});

export default connect(
  mapStateToProps,
  { getTexts, createText, setAlert }
)(CompanyText);
