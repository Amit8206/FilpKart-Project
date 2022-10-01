import React from 'react'
import { Layout } from '../../components/Layout'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useState } from 'react'
import Input from '../../components/UI/Input'
import Modal from "../../components/UI/Modal"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../actions'
import './style.css'
import { generatePubliucUrls } from '../../urlConfig'



const Products = () => {

  const [show, setShow] = useState(false);
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [productDetails, setProductDetails] = useState(null);

  const dispatch = useDispatch();

  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);



  const handleSave = () => {

    const form = new FormData();

    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);

    for (let pic of productPictures) {
      form.append('productPictures', pic);
    }

    dispatch(addProduct(form));
    setShow(false);
  }



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  }



  const handleProductPictures = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
  }


  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 17 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          { product.products.length > 0 ?
            product.products.map(product =>
              <tr className='selectProduct' onClick={() => showProductDetailsModal(product)} key={product._id}>
                <td>1</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category.name}</td>
              </tr>) : null
          }

        </tbody>
      </Table>
    );
  }


  const renderAddProductModal = () => {
    return (
      <Modal 
      show={show} 
      handleClose={handleClose} 
      handleSave={handleSave} 
      modelTitle={"Add New Product"}
      >

        <Input
          value={name}
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          value={quantity}
          placeholder={`Product Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <Input
          value={price}
          placeholder={`Product Price`}
          onChange={(e) => setPrice(e.target.value)}
        />

        <Input
          value={description}
          placeholder={`Product Description`}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select className='form-control'
          value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option>Select Category</option>
          {
            createCategoryList(category.categories).map(option =>
              <option key={option.value} value={option.value}> {option.name} </option>
            )
          }

        </select>

        {
          productPictures.length > 0 ?
            productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
        }

        <input type='file' name="productPictures" onChange={handleProductPictures} />
      </Modal>
    );
  }

  const handleSaveProductDetailsModal = () => {
    setProductDetailsModal(false);
  }
  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailsModal(true);
    console.log(product);
  }


  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <Modal 
      show={productDetailsModal} 
      handleClose={() => setProductDetailsModal(false)} 
      modelTitle={"Product Details"} 
      size='lg'
      handleSave={handleSaveProductDetailsModal}
      >
        <Row>
          <Col md='6'>
            <label className='key'>Name</label>
            <p className='value'>{productDetails.name}</p>
          </Col>
          <Col md='6'>
            <label className='key'>Price</label>
            <p className='value'>{productDetails.price}</p>
          </Col>
        </Row>

        <Row>
          <Col md='6'>
            <label className='key'>Quantity</label>
            <p className='value'>{productDetails.quantity}</p>
          </Col>
          <Col md='6'>
            <label className='key'>Category</label>
            <p className='value'>{productDetails.category.name}</p>
          </Col>
        </Row>

        <Row>
          <Col md='12'>
            <label className='key'>Description</label>
            <p className='value'>{productDetails.description}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <label className='key'>Product Pictures</label>
            <div style={{ display: 'flex' }}>
              {productDetails.productPictures.map(picture =>

                <div className='productImgContainer'>
                  <a href={generatePubliucUrls(picture.img)}><img src={generatePubliucUrls(picture.img)} alt="" /></a>
                </div>
              )}
            </div>
          </Col>
        </Row>

      </Modal>
    );
  }

  return (
    <Layout sidebar>

      <Container>
        <Row>
          <Col md={12}>
            <div className='d-flex justify-content-lg-between my-5'>
              <h2>Product</h2>
              <button type="button" onClick={handleShow} className="btn btn-primary">Add</button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            {renderProducts()}
          </Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  )
}

export default Products