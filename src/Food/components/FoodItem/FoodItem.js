
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FoodItem.css';
import Barcode from 'react-barcode';

const Food = ({ _id, title, price, description, style, editHandler,deleteHandler }) => (
    <div style={style} className="food-card">
        <Card style={{ width: "100%", height: "100%" }}>
            <Card.Body>
                <Card.Title>
                    <div className='title-text'>{title}</div>
                    <div>
                        <Button variant="secondary" onClick={editHandler}>edit</Button>
                        <Button variant="danger" onClick={deleteHandler}>delete</Button>
                    </div>
                </Card.Title>
                <hr />
                <div className='barcode'>
                    <Barcode value={_id} />
                </div>
                <Card.Subtitle className="mb-2 text-muted">₹ {price}/-</Card.Subtitle>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
)

export default Food;