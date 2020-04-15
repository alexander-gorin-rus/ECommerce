import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { updateCategory } from '../../../../actions/category';
import { connect } from 'react-redux';

const CategoryUpdate = ({ current, updateCategory }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (current) {
      setName(current.name);
    }
  }, [current]);

  const onSubmit = () => {
    if (name === '') {
      console.log('error');
    } else {
      const updatedCategory = {
        id: current.id,
        name
      };
      updateCategory(updatedCategory);
      setName('');
    }
  };

  return (
    <div id='edit-category-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4 className='center-align'>Изменить название категории</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect waves-light btn'
        >
          Отправить
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '75%',
  height: '55%'
};

CategoryUpdate.propTypes = {
  updateCategory: PropTypes.func.isRequired,
  current: PropTypes.object
};

const mapStateToProps = state => ({
  current: state.category.current
});

export default connect(
  mapStateToProps,
  { updateCategory }
)(CategoryUpdate);

//export default CategoryUpdate;
