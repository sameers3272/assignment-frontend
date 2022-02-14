import { Modal } from "react-bootstrap";

const CustomModal = props => {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            {props.chidren}
        </Modal>
    )
}

export default CustomModal;