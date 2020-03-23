import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  consumer: { consumerAuthenticated, consumerLoading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !consumerAuthenticated ? <Redirect to='/' /> : <Component {...props} />
    }
  />
);

PrivateRoute.propTypes = {
  consumer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  consumer: state.consumer
});

export default connect(mapStateToProps)(PrivateRoute);
