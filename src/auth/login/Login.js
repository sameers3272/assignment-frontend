import { useContext, useEffect, useState } from 'react';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import { AuthContext } from '../../shared/context/auth-context';


const intialInput = {
    email: '',
    password: ''
}
const Login = props => {
    const auth = useContext(AuthContext);
    const [inputUser, setInputUser] = useState(intialInput)
    const [errmsg, setErrmsg] = useState(props.errorMessage ? props.errorMessage : null)


    useEffect(() => {
        if (props.errorMessage){
            setErrmsg(props.errorMessage)
        }

        return ()=>{
            setErrmsg(null);
        }
    }, [props.errorMessage])




    return (
        <Container className='centered' style={{ flexDirection: "column", height: "60vh" }}>
            <Modal show={!!errmsg} onHide={() => { setErrmsg(null) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.errorMessage}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setErrmsg(null) }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <h1>Login</h1>
            <div className='form '>

                <Form>
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
                        <Form.Control type="password" value={inputUser.password}
                            onChange={(e) => setInputUser(pre => {
                                return { ...pre, password: e.target.value }
                            })}
                            placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={() => auth.login(inputUser)}>
                        Login 
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default Login;