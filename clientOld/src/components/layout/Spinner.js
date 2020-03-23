import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <img
      src={spinner}
      style={{ width: '300px', margin: 'auto', display: 'block' }}
      alt='loading...'
    />
  );
};

export default Spinner;
