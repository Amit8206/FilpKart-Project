import React, { useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addCategory, getAllCategory, updateCategories, deleteCategories as deleteCategoriesAction } from '../../actions'
import { Layout } from '../../components/Layout'
import CheckboxTree from 'react-checkbox-tree';
import { IoIosAdd, IoIosTrash, IoIosCloudUpload } from "react-icons/io";
import { IoFolderOutline, IoChevronForwardOutline, IoChevronDown } from "react-icons/io5";

import { BsCheckSquareFill, BsCheckSquare } from "react-icons/bs";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModal from './components/UpdateCategoriesModal'
import AddCategoryModal from './components/AddCategoryModal'
import DeleteCategoryModal from './components/DeleteCategoryModal'
import './style.css'


const Category = (props) => {

    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('')
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)
    const dispatch = useDispatch();



    useEffect(() => {
        if(!category.loading){
            setShow(false);
        }
    }, [category.loading])
    

    const handleSave = () => {
        const form = new FormData();

        if (categoryName === '') {
            alert('Name Is required !!');
            setShow(false);
            return;
        } else {
            form.append('name', categoryName);
            form.append('parentId', parentCategoryId);
            form.append('categoryImage', categoryImage);
            dispatch(addCategory(form));

            const cat = {
                categoryName,
                parentCategoryId,
                categoryImage
            }
            console.log(cat)

            setShow(false);
        }
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            )
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    }


    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    const updateCategory = () => {
        updateCheckedAndExpandedArray();
        setUpdateCategoryModal(true);
    }
    const updateCheckedAndExpandedArray = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && checkedArray.push(category)
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && expandedArray.push(category)
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);

        console.log({ checked, expanded, categories, checkedArray, expandedArray });
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === 'expanded') {
            const updatedExpandedArray = expandedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        } else if (type === 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : '');
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : '');
            form.append('type', item.type);
        });
        dispatch(updateCategories(form));
        setUpdateCategoryModal(false);
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedArray();
        setDeleteCategoryModal(true);
    }
    const deleteCetegories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);

        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory());
                        setDeleteCategoryModal(false);
                    }
                })
            setDeleteCategoryModal(false);
        }
    }


    const categoryList = createCategoryList(category.categories);


    return (
        <Layout sidebar>
            {/* Show Category */}
            <Container>
                <Row>
                    <Col md={12}>
                        <div className='d-flex justify-content-lg-between my-5'>
                            <h2>Category</h2>
                            <div className='actionBtnContainer'>
                                <span>Actions: </span>
                                <button type="button" onClick={handleShow} className="btn btn-sm"><IoIosAdd /><span>Add</span></button>
                                <button className="btn btn-sm" onClick={deleteCategory}><IoIosTrash /><span>Delete</span></button>
                                <button className="btn btn-sm" onClick={updateCategory}><IoIosCloudUpload /><span>Edit</span></button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <BsCheckSquareFill />,
                                uncheck: <BsCheckSquare />,
                                halfCheck: <BsCheckSquare />,
                                expandClose: <IoChevronForwardOutline />,
                                expandOpen: <IoChevronDown />,
                                parentClose: <IoFolderOutline />,
                                leaf: <IoFolderOutline />,
                            }}
                        />
                    </Col>
                </Row>
            </Container>

            {/* {renderAddCategoryModal()} */}
            <AddCategoryModal
                show={show}
                handleClose={handleClose}
                handleSave={handleSave}
                modelTitle={"Add New Category"}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
            />
            {/* {renderUpdateCategoriesModal()} */}
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                handleSave={updateCategoriesForm}
                modelTitle={"Update Category"}
                size='lg'
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />
            {/* {renderDeleteCategoryModal()} */}
            <DeleteCategoryModal
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                handleSave={deleteCategory}
                modelTitle={"Confirm"}
                size='lg'
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            alert('No');
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCetegories
                    }
                ]}
                expandedArray={expandedArray}
                checkedArray={checkedArray}

            />

        </Layout>
    )
}

export default Category;