import { Col, Row } from 'react-bootstrap';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';



const AddCategoryModal = (props) => {
    const {
        show,
        handleClose,
        handleSave,
        modelTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage

    } = props;


    return (
        <Modal
            show={show}
            handleClose={handleClose}
            handleSave={handleSave}
            modelTitle={modelTitle}
        >
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className='form-control-sm'
                    />
                </Col>
                <Col>
                    <select className='form-select form-select-sm' value={parentCategoryId} onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>Select Category</option>
                        {
                            categoryList.map(option =>
                                <option key={option.value} value={option.value}> {option.name} </option>
                            )}
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type='file' name="categoryImage" onChange={handleCategoryImage} />
                </Col>
            </Row>
        </Modal>
    );
}

export default AddCategoryModal;







// const renderAddCategoryModal = () => {
//     return (

//         <Modal Modal show={show} handleClose={handleClose} handleSave={handleSave} modelTitle={"Add New Category"} >
//             <Input
//                 value={categoryName}
//                 placeholder={`Category Name`}
//                 onChange={(e) => setCategoryName(e.target.value)}
//             />
//             <select className='form-select' value={parentCategoryId} onChange={(e) => setParentCategoryId(e.target.value)}>
//                 <option>Select Category</option>
//                 {
//                     createCategoryList(category.categories).map(option =>
//                         <option key={option.value} value={option.value}> {option.name} </option>
//                     )}
//             </select>
//             <input type='file' name={categoryImage} onChange={handleCategoryImage} />
//         </Modal>
//     );
// }