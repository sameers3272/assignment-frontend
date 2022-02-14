import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import Food from "../FoodItem/FoodItem";
import { AiOutlinePlusCircle } from "react-icons/ai";
import './Foods.css';
import BackDrop from "../../../shared/BackDrop/BackDrop";
import { currentDate } from "../../../util/date";
import axios from "axios";


const intialInputFood = {
    title: '',
    price: '',
    description: '',
    createdDate: currentDate(),
    expiredDate: ''
};


const Foods = ({ userId }) => {
    const [foods, setFoods] = useState([]);
    const [show, setShow] = useState(false);
    const [inputFood, setInputFood] = useState(intialInputFood)
    const [addable, setAddable] = useState(false)
    const [editable, setEditable] = useState(false);
    const [deleteable, setDeleteable] = useState(false);
    const [dId, setDId] = useState(null);


    const handleClose = () => {
        setShow(false)
        setAddable(false);
        setEditable(false);
        setDeleteable(false);
        setInputFood(intialInputFood);
    };
    const handleShow = () => { setShow(true); setAddable(true); };


    useEffect(() => {
        const get = async () => {
            try {
                const res = await axios.get('http://localhost:5000/')
                setFoods(res.data);
            }
            catch (err) {
                console.log(err)
            }
        }
        get();
    }, [])


    const addFoodHandler = async () => {
        try {
            const resData = await axios.post('http://localhost:5000/admin/add-food', inputFood)
            setFoods(prev => [...prev, resData.data]);
        } catch (err) {
            console.log(err)
        }
        handleClose();
    }



    const editModalHandler = (id) => {
        const editableFood = foods.find(f => f._id === id);
        setInputFood(editableFood);
        setEditable(true);
        setShow(prev => !prev);
    }


    const UpdateFoodHandler = async () => {
        try {
            const res = await axios.put('http://localhost:5000/admin/edit-food', { ...inputFood });
            const updatedFoods = foods.map(f => {
                if (f._id === inputFood._id) {
                    return { ...res.data }
                }
                return { ...f }
            })
            setFoods(updatedFoods)
            handleClose();
        }
        catch (err) {
            console.log(err)
        }
    }

    const deleteModalHandler = (id) => {
        setDId(id);
        setDeleteable(true);
        setShow(true)

    }

    const deleteHandler = async (id) => {
        console.log(id);
        const res = await axios.delete(`http://localhost:5000/admin/delete-food/${id}`)
        const upadateFoods = foods.filter(f => f._id !== id);
        setFoods(upadateFoods);
        setDId(null);
        handleClose()
    }

    let content;
    if (foods.length === 0) {
        content = <Col xs={6} md={3}  >No Food Found..!</Col>
    }
    else {
        content = foods.map(f =>
            <Col key={f._id} xs={12} md={6} lg={3} >
                <Food title={f.title}
                    price={f.price}
                    description={f.description}
                    _id={f._id}
                    deleteHandler={() => deleteModalHandler(f._id)}
                    editHandler={() => editModalHandler(f._id)}
                />
            </Col>
        )
    }


    return (
        <Container className="mt-3">
            <Row>
                {content}
            </Row>
            <Button className="add-btn" onClick={handleShow}><AiOutlinePlusCircle size={40} /></Button>
            {show && <BackDrop closeDrawer={handleClose} />}
            <Modal show={show && deleteable} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do You really want to Delete this Food..?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => deleteHandler(dId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={(show && editable) || (show && addable)} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editable ? "Edit Food" : "Add Food"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Burger" value={inputFood.title} onChange={(e) => setInputFood(prev => { return { ...prev, title: e.target.value } })} />

                        </Form.Group>
                        <Row>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Create Date</Form.Label>
                                    <Form.Control type="date" value={inputFood.createdDate} readOnly />

                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Expired Date</Form.Label>
                                    <Form.Control type="date" onChange={(e) => setInputFood(prev => { return { ...prev, expiredDate: e.target.value } })} value={inputFood.expiredDate} />

                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={inputFood.price} onChange={(e) => setInputFood(prev => { return { ...prev, price: e.target.value } })} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" value={inputFood.description} rows={5} onChange={(e) => setInputFood(prev => { return { ...prev, description: e.target.value } })} />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editable ? UpdateFoodHandler : addFoodHandler}>
                        {editable ? "Update Food" : "Add Food"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Foods;