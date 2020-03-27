import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutConsumer } from '../../actions/consumer';

const Dashbord = ({
  consumer: { isAuthenticated, loading },
  logoutConsumer
}) => {
  const logout = () => {
    logoutConsumer();
  };

  return (
    <div>
      <button onClick={logout} className='d-flex justify-content-end'>
        <Link to='/'>Выйти из моей страницы</Link>
      </button>
    </div>
  );
};

Dashbord.propTypes = {
  logoutConsumer: PropTypes.func.isRequired,
  consumer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  consumer: state.consumer
});

export default connect(
  mapStateToProps,
  { logoutConsumer }
)(Dashbord);
