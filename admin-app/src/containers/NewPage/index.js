import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Layout } from '../../components/Layout'
import Modal from '../../components/UI/Modal'
import Input from '../../components/UI/Input'
import linearCategories from '../../helpers/linearCategories';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions';


const NewPage = (props) => {

  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const category = useSelector(state => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('');
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const page = useSelector(state => state.page)


  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category])

  useEffect(() => {
    console.log(page)
    if(!page.loading){
      setCreateModal(false)
      setTitle("")
      setCategoryId("")
      setDesc("")
      setProducts("")
      setBanners("")
    }
  }, [page])


  const onCategoryChange = (e) => {
    const category = categories.find(category => category.value === e.target.value);
    setCategoryId(e.target.value);
    setType(category.type);
  }

  const handleBannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  }

  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  }

  const submitPageForm = (e) => {

    if (title === "") {
      alert('Title is required');
      setCreateModal(false);
      return;
    }

    const form = new FormData();
    form.append('title', title);
    form.append('description', desc);
    form.append('category', categoryId);
    form.append('type', type);
    banners.forEach((banner, index) => {
      form.append('banners', banner);
    });
    products.forEach((product, index) => {
      form.append('products', product);
    });

    console.log({ title, desc, categoryId, type, banners, products });
    dispatch(createPage(form));
    setCreateModal(false);
  }

  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modelTitle={'Create New Page'}
        handleClose={() => setCreateModal(false)}
        handleSave={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              {/* <select
                className='form-select'
                value={categoryId}
                onChange={onCategoryChange}
              >
                <option value=''>Select Category</option>
                {
                  categories.map(cat =>
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  )
                }

              </select> */}


              <Input
                type="select"
                value={categoryId}
                onChange={onCategoryChange}
                options={categories}
                placeholder={'Select Category'}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                className='form-control'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'Page Title'}

              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                className='form-control'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={'Page Description'}
              />
            </Col>
          </Row>
          {
            banners.length > 0 ?
              banners.map((banner, index) =>
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ) : null
          }

          <Row>
            <Col>
              <Input
                type='file'
                name='banners'
                onChange={handleBannerImages}
              />
            </Col>
          </Row>
          {
            products.length > 0 ?
              products.map((product, index) =>
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ) : null
          }
          <Row>
            <Col>
              <Input
                type='file'
                name='products'
                onChange={handleProductImages}
              />
            </Col>
          </Row>

        </Container>

      </Modal>
    )
  }

  return (
    <Layout sidebar>

      {
        page.loading ?
          <p>Createing Page Please Wait....</p>
          :
          <>
            {renderCreatePageModal()}
            <button className='btn btn-primary my-5 mx-5' onClick={() => setCreateModal(true)}>Create Page</button>
          </>
      }
      {/* {renderCreatePageModal()}
      <button onClick={() => setCreateModal(true)}>Create Page</button> */}
    </Layout>
  )
}

export default NewPage