import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Preloader from '../../layout/Preloader';
import CompanyNameItem from './CompanyNameItem';
import { createName, getNames } from '../../../actions/companyName';
import { setAlert } from '../../../actions/alert';

const Company_Name = ({
  setAlert,
  createName,
  getNames,
  companyName: { names, loading }
}) => {
  useEffect(() => {
    getNames();
  }, [getNames]);

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
      createName({ name });
    }
  };

  return (
    <Fragment>
      <h4 className=' mt-5'>Создать название компании</h4>
      <form onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
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
      <h4 className=''>Созданные имена</h4>

      {loading ? (
        <Preloader />
      ) : (
        <div className='categories-list-div'>
          <div className='center-align'>
            <div style={{ backgroundColor: '#B1EED0' }}>
              {names.map(compName => (
                <CompanyNameItem
                  className='list-inline-item mb-3'
                  key={compName._id}
                  compName={compName}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Company_Name.propTypes = {
  createName: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  getNames: PropTypes.func.isRequired,
  companyName: PropTypes.object
};

const mapStateToProps = state => ({
  companyName: state.companyName
});

export default connect(
  mapStateToProps,
  { createName, setAlert, getNames, setAlert }
)(Company_Name);
