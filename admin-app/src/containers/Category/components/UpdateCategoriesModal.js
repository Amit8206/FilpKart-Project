import { Row, Col } from 'react-bootstrap';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';





const UpdateCategoriesModal = (props) => {
    const {
        show,
        handleClose,
        handleSave,
        modelTitle,
        size,
        handleCategoryInput,
        expandedArray,
        checkedArray,
        categoryList
    } = props;

    return (

        <Modal show={show}
            handleClose={handleClose}
            handleSave={handleSave}
            modelTitle={modelTitle}
            size={size}
        >


            {/* For Expanded List */}
            <Row>
                <Col className='d-flex justify-content-center'>
                    <h5>Expanded Items</h5>
                </Col>
            </Row>
            {
                expandedArray.length > 0 &&
                expandedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                            />
                        </Col>
                        <Col>
                            <select
                                className='form-select'
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                            >
                                <option>Select Category</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}> {option.name} </option>
                                    )}
                            </select>
                        </Col>
                        <Col>
                            <select
                                className='form-select'
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                            >
                                <option value=''>Select Type</option>
                                <option value='store'>Store</option>
                                <option value='product'>Product</option>
                                <option value='page'>Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }


            {/* For Checked List */}
            <Row>
                <Col className='d-flex justify-content-center'>
                    <h5>Checked Items</h5>
                </Col>
            </Row>

            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) =>
                    <Row key={index}>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                            />
                        </Col>
                        <Col>
                            <select className='form-select'
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                            >
                                <option>Select Category</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}> {option.name} </option>
                                    )}
                            </select>
                        </Col>
                        <Col>
                            <select
                                className='form-select'
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                            >
                                <option value=''>Select Type</option>
                                <option value='store'>Store</option>
                                <option value='product'>Product</option>
                                <option value='page'>Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }

            {/* <input type='file' name={categoryImage} onChange={handleCategoryImage} /> */}
        </Modal >

    );
}


export default UpdateCategoriesModal;







// const renderUpdateCategoriesModal = () => {
//     return (

//         <Modal show={updateCategoryModal}
//             handleClose={() => setUpdateCategoryModal(false)}
//             handleSave={updateCategoriesForm}
//             modelTitle={"Update Category"} size='lg'>


//             {/* For Expanded List */}
//             <Row>
//                 <Col className='d-flex justify-content-center'>
//                     <h5>Expanded Items</h5>
//                 </Col>
//             </Row>
//             {
//                 expandedArray.length > 0 &&
//                 expandedArray.map((item, index) =>
//                     <Row key={index}>
//                         <Col>
//                             <Input
//                                 value={item.name}
//                                 placeholder={`Category Name`}
//                                 onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
//                             />
//                         </Col>
//                         <Col>
//                             <select className='form-select'
//                                 value={item.parentId}
//                                 onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
//                             >
//                                 <option>Select Category</option>
//                                 {
//                                     createCategoryList(category.categories).map(option =>
//                                         <option key={option.value} value={option.value}> {option.name} </option>
//                                     )}
//                             </select>
//                         </Col>
//                         <Col>
//                             <select className='form-select'>
//                                 <option value=''>Select Type</option>
//                                 <option value='store'>Store</option>
//                                 <option value='product'>Product</option>
//                                 <option value='page'>Page</option>
//                             </select>
//                         </Col>
//                     </Row>
//                 )
//             }


//             {/* For Checked List */}
//             <Row>
//                 <Col className='d-flex justify-content-center'>
//                     <h5>Checked Items</h5>
//                 </Col>
//             </Row>

//             {
//                 checkedArray.length > 0 &&
//                 checkedArray.map((item, index) =>
//                     <Row key={index}>
//                         <Col>
//                             <Input
//                                 value={item.name}
//                                 placeholder={`Category Name`}
//                                 onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
//                             />
//                         </Col>
//                         <Col>
//                             <select className='form-select'
//                                 value={item.parentId}
//                                 onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
//                             >
//                                 <option>Select Category</option>
//                                 {
//                                     createCategoryList(category.categories).map(option =>
//                                         <option key={option.value} value={option.value}> {option.name} </option>
//                                     )}
//                             </select>
//                         </Col>
//                         <Col>
//                             <select className='form-select'>
//                                 <option value=''>Select Type</option>
//                                 <option value='store'>Store</option>
//                                 <option value='product'>Product</option>
//                                 <option value='page'>Page</option>
//                             </select>
//                         </Col>
//                     </Row>
//                 )
//             }

//             {/* <input type='file' name={categoryImage} onChange={handleCategoryImage} /> */}
//         </Modal >

//     );
// }