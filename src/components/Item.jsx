import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';

export const Item = ({ product }) => (
    <Card key={product.id} id={product.id} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={product.imgUrl} />
        <Card.Body>
            <Card.Title>{product.prod_name}</Card.Title>
            <Card.Text>{product.category}</Card.Text>
            <NavLink to={`/item/${product.id}`}>
                <Button className='viewProduct' variant="primary">Ver Producto</Button>
            </NavLink>
        </Card.Body>
    </Card>
);