import React, { useState, Fragment } from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import FileUpload from './FileUpload';
import Axios from 'axios';
import { setAlert } from '../../../../actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// const { Title } = Typography;
const { TextArea } = Input;

const Categories = [
  { key: 1, value: 'Бытовая химия' },
  { key: 2, value: 'Средства для чистки авто' },
  { key: 3, value: 'Средства для чистки мебели' }
];

function CreateProduct({ setAlert }) {
  const [TitleValue, setTitleValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('');
  const [PriceValue, setPriceValue] = useState(0);
  const [CategoryValue, setCategoryValue] = useState(1);
  const [Images, setImages] = useState([]);
  const [QuantityValue, setQuantityValue] = useState(0);
  const [VolumeValue, setVolumeValue] = useState(0);

  const onTitleChange = event => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = event => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = event => {
    setPriceValue(event.currentTarget.value);
  };

  const onCategorySelectChange = event => {
    setCategoryValue(event.currentTarget.value);
  };

  const onQuantityChange = event => {
    setQuantityValue(event.currentTarget.value);
  };

  const onVolumeChange = event => {
    setVolumeValue(event.currentTarget.value);
  };
  const updateImages = newImages => {
    setImages(newImages);
  };
  const onSubmit = event => {
    event.preventDefault();

    const variables = {
      name: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      volume: VolumeValue,
      quantity: QuantityValue,
      category: CategoryValue
    };

    Axios.post('/api/products/create-product', variables).then(response => {
      if (response.data.success) {
        setAlert('Продукт успешно загружен', 'success');
      } else {
        setAlert('Ошибка при загрузке продукта', 'danger');
      }
    });
  };

  return (
    <Fragment>
      <h2 className='my-5 '>Форма создания продукта</h2>
      <Form onSubmit={onSubmit}>
        <FileUpload refreshFunction={updateImages} />
        <div className='form-group'>
          <label>Название продукта</label>
          <Input
            className='form-control'
            onChange={onTitleChange}
            value={TitleValue}
          />
        </div>
        <div className='form-group'>
          <label>Описание продукта</label>
          <TextArea
            className='form-control'
            onChange={onDescriptionChange}
            value={DescriptionValue}
          />
        </div>
        <div className='form-group'>
          <label>Объем тары</label>
          <Input
            className='form-control'
            onChange={onVolumeChange}
            type='number'
            value={VolumeValue}
          />
        </div>
        <div className='form-group'>
          <label>Цена</label>
          <Input
            onChange={onPriceChange}
            type='number'
            className='form-control'
            value={PriceValue}
          />
        </div>
        <div className='form-group'>
          <label>Количество</label>
          <Input
            onChange={onQuantityChange}
            type='number'
            className='form-control'
            value={QuantityValue}
          />
        </div>
        <div className='form-group'>
          <label>Категория</label>
          <select onChange={onCategorySelectChange}>
            {Categories.map(item => (
              <option key={item.key} value={item.key}>
                {item.value}{' '}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={onSubmit}>Submit</Button>
        <Link className='ml-3 p-2 btn btn-warning' to='/admin_dashboard'>
          Вернуться в админ панель
        </Link>
      </Form>
    </Fragment>
  );
}

CreateProduct.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert }
)(CreateProduct);

// import React, { Fragment, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { addProduct } from '../../../../components/apiAdmin';
// import { getCategories } from '../../../../actions/category';
// import { adminAuth } from '../../../../auth';
// import CategoryItem from './CategoryItem';
// import { loadAdmin } from '../../../../actions/admin';
// import FileUpload from './FileUpload';

// import { setAlert } from '../../../../actions/alert';

// const CreateProduct = ({
//   props,
//   addProduct,
//   getCategories,
//   setAlert,

//   category: { categories }
// }) => {
//   useEffect(() => {
//     getCategories();
//   }, []);

//   const [values, setValues] = useState({
//     name: '',
//     description: '',
//     price: '',
//     volume: '',
//     //categories: [],
//     category: '',
//     quantity: '',
//     error: '',
//     photo: '',
//     loading: false,
//     createdProduct: '',
//     formData: ''
//   });

//   const {
//     name,
//     description,
//     price,
//     volume,
//     //categories,
//     category,
//     quantity,
//     loading,
//     createdProduct,
//     formData,
//     error
//   } = values;

//   // const initCategory = () => {
//   //   getCategories().then(data => {
//   //     if(data.error){
//   //       console.log('errors')
//   //     }else{
//   //       setCategoryValue(categoryValue)
//   //     }
//   //   })
//   // }

//   useEffect(() => {
//     setValues({ ...values, formData: new FormData() });
//   }, []);

//   const onChange = name => event => {
//     const value = name === 'photo' ? event.target.files[0] : event.target.value;
//     formData.set(name, value);
//     setValues({ ...values, [name]: value });
//   };

//   const { admin_token } = adminAuth;

//   const onSubmit = e => {
//     e.preventDefault();
//     setValues({ ...values, error: '', loading: true });
//     addProduct(admin_token, formData).then(data => {
//       if (data.error) {
//         setValues({ ...values, error: data.error });
//       } else {
//         setValues({
//           ...values,
//           name: '',
//           description: '',
//           price: '',
//           volume: '',
//           quantity: '',
//           photo: '',
//           categories: [],
//           loading: false,
//           createdProduct: data.name
//         });
//       }
//     });
//   };

//   const changeCategory = () => {
//     console.log(category.name);
//   };
//   return (
//     <Fragment>
//       <h2 className='my-5 '>Форма создания продукта</h2>
//       <form onSubmit={onSubmit}>
//         <div className='form-group'>
//           <label className='btn btn-primary'>
//             {' '}
//             Выбрать фото{' '}
//             <input
//               onChange={onChange('photo')}
//               type='file'
//               name='photo'
//               accept='image/*'
//             />
//           </label>
//         </div>
//         <div className='form-group'>
//           <label>Название продукта</label>
//           <input
//             onChange={onChange('name')}
//             type='text'
//             className='form-control'
//             value={name}
//           />
//         </div>
//         <div className='form-group'>
//           <label>Описание продукта</label>
//           <textarea
//             onChange={onChange('description')}
//             className='form-control'
//             value={description}
//           />
//         </div>
//         <div className='form-group'>
//           <label>Объем тары</label>
//           <input
//             onChange={onChange('volume')}
//             type='number'
//             className='form-control'
//             value={volume}
//           />
//         </div>
//         <div className='form-group'>
//           <label>Цена</label>
//           <input
//             onChange={onChange('price')}
//             type='number'
//             className='form-control'
//             value={price}
//           />
//         </div>
//         <div className='form-group'>
//           <label>Количество</label>
//           <input
//             onChange={onChange('quantity')}
//             type='number'
//             className='form-control'
//             value={quantity}
//           />
//         </div>
//         <div className='form-group'>
//           <label>Категория</label>
//           <select className='form-control'>
//             <option>Выбрать категорию</option>
//             {categories.map((category, id) => (
//               <CategoryItem key={id} category={category} />
//             ))}
//           </select>
//         </div>
//         <button type='submit' className='btn btn-primary'>
//           Отправить
//         </button>
//         <Link className='ml-3 p-2 btn btn-warning' to='/admin_dashboard'>
//           Вернуться в админ панель
//         </Link>
//       </form>
//     </Fragment>
//   );
// };

// CreateProduct.propTypes = {
//   addProduct: PropTypes.func.isRequired,
//   getCategories: PropTypes.func.isRequired,
//   category: PropTypes.object,
//   setAlert: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({
//   category: state.category
// });

// export default connect(
//   mapStateToProps,
//   { addProduct, getCategories, setAlert }
// )(CreateProduct);
