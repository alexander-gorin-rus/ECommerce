import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const NavbarCategoryItem = ({ category: { name } }) => {
  return (
    <Fragment>
      <Link className='navbar-link px-2' to={`/products/${name}`}>
        {name}
      </Link>
      <br />
    </Fragment>
  );
};

export default NavbarCategoryItem;
