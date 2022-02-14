import axios from 'axios';
import { useContext, useState } from 'react';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import { AuthContext } from '../../shared/context/auth-context';


const initialInput = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const Signup = () => {
    const [inputUser, setInputUser] = useState(initialInput)

    const [errmsg, setErrmsg] = useState(null)

    const auth = useContext(AuthContext);

    const signupHandler = async () => {
        const res = await axios.post('http://localhost:5000/sign-up', inputUser);
        if (res.data.ok) {
            auth.login({ email: inputUser.email, password: inputUser.password })
        } else {
        
            setErrmsg(res.data.message)
        }
    }

    return (
        <Container className='centered' style={{
            flexDirection: "column",
            height: "80vh"
        }}>
            <Modal show={!!errmsg} onHide={() => { setErrmsg(null) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errmsg}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setErrmsg(null) }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <h1>Create a new Account</h1>
            <div className='form '>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control type="text" value={inputUser.name} onChange={(e) => setInputUser(pre => {
                            return { ...pre, name: e.target.value }
                        })} placeholder="Enter your Name" autoComplete="off" />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={inputUser.email}
                            onChange={(e) => setInputUser(pre => {
                                return { ...pre, email: e.target.value }
                            })}
                            placeholder="Enter email" autoComplete="off" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={inputUser.password}
                            onChange={(e) => setInputUser(pre => {
                                return { ...pre, password: e.target.value }
                            })}
                            type="password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                            onChange={(e) => setInputUser(pre => {
                                return { ...pre, confirmPassword: e.target.value }
                            })}
                            value={inputUser.confirmPassword} />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={signupHandler}>
                        Signup
                    </Button>
                </Form>

            </div>
        </Container>
    );
}

export default Signup;