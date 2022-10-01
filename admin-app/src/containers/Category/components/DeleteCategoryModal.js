import Modal from '../../../components/UI/Modal';



const DeleteCategoryModal = (props) => {
    const {
        show,
        handleClose,
        handleSave,
        modelTitle,
        size,
        expandedArray,
        checkedArray,
        buttons
        

    } = props;


    return (
        <Modal
            show={show}
            handleClose={handleClose}
            handleSave={handleSave}
            modelTitle={modelTitle}
            size={size}
            buttons={buttons}
            
        >
            <h5>Expanded</h5>
            {expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}
            <h5>Checked</h5>
            {checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}

        </Modal>
    )
}


export default DeleteCategoryModal;





// const renderDeleteCategoryModal = () => {
//     // console.log('Delete', checkedArray);
//     return (
//         <Modal
//             show={deleteCategoryModal}
//             handleClose={() => setDeleteCategoryModal(false)}
//             handleSave={deleteCategory}
//             modelTitle={"Confirm"}
//             size='lg'
//             buttons={[
//                 {
//                     label: 'No',
//                     color: 'primary',
//                     onClick: () => {
//                         alert('No');
//                     }
//                 },
//                 {
//                     label: 'Yes',
//                     color: 'danger',
//                     onClick: deleteCetegories
//                 }
//             ]}
//         >
//             <h5>Expanded</h5>
//             {expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}
//             <h5>Checked</h5>
//             {checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}

//         </Modal>
//     )
// }