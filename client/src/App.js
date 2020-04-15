import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

//Components
import SetAlert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Admin from './components/admin/adminInfo/Admin';
import Login from './components/admin/adminInfo/Login';
import PrivateRoute1 from './components/routing/PrivateRoute1';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminDashboard from './components/admin/products/AdminDashboard';
import CompanyText from './components/admin/companyText/CompanyText';
import Company_Name from './components/admin/companyText/Company_Name';
import CreateCategory from './components/admin/products/category/CreateCategory';
import CreateCategory_ from './components/admin/products/category/CreateCategory_';
import CreateProduct from './components/admin/products/products/CreateProduct';
import DinamicCategories from './components/admin/products/products/DinamicCategories';
import CreatePartner from './components/admin/partners/CreatePartner';
import Dashboard from './components/layout/Dashboard';
import Signin from './components/consumers/Signin';
import Signup from './components/consumers/Signup';
import CategoryUpdate from './components/admin/products/category/CategoryUpdate';

import TemporaryProductsPage from './components/admin/products/products/TemporaryProductsPage';

//CSS
import './App.scss';
// import 'materialize-css/dist/css/materialize.min.css';
// import M from 'materialize-css/dist/js/materialize.min.js';

//Redux
import store from './store';
import { loadAdmin } from './actions/admin';
import { loadConsumer } from './actions/consumer';
import setAdminToken from './utils/setAdminToken';
import setConsumerToken from './utils/setConsumerToken';

if (localStorage.admin_token) {
  setAdminToken(localStorage.admin_token);
}

if (localStorage.consumer_token) {
  setConsumerToken(localStorage.consumer_token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadAdmin(), loadConsumer());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />

          <Route exact path='/' component={Landing} />
          <section className='container'>
            <CategoryUpdate />
            <SetAlert />
            <Switch>
              <Route exact path='/max-register' component={Admin} />
              <Route exact path='/max-auth' component={Login} />
              <PrivateRoute1
                exact
                path='/admin_dashboard'
                component={AdminDashboard}
              />
              <PrivateRoute1
                exact
                path='/create_category'
                component={CreateCategory}
              />
              <PrivateRoute1
                exact
                path='/create_product'
                component={CreateProduct}
              />
              <PrivateRoute1
                exact
                path='/create_text'
                component={CompanyText}
              />
              <PrivateRoute1
                exact
                path='/create_name'
                component={Company_Name}
              />
              <PrivateRoute1
                exact
                path='/create_partner'
                component={CreatePartner}
              />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <Route exact path='/signin' component={Signin} />
              <Route exact path='/signup' component={Signup} />
              <Route
                exact
                path='/products/:name'
                render={props => <DinamicCategories {...props} />}
              />
              <Route
                exact
                path='/temp-products'
                component={TemporaryProductsPage}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
