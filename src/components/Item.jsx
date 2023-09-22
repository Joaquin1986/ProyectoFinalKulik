import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';

export const Item = ({ product }) => (
    <Card key={product.id} id={product.id} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={product.imageId} />
        <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.categoryId}</Card.Text>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>Stock: {product.stock}</Card.Text>
            <Card.Text>Precio: ${product.price}</Card.Text>
            <NavLink to={`/item/${product.id}`}>
                <Button className='viewProduct' variant="primary">Ver Producto</Button>
            </NavLink>
        </Card.Body>
    </Card>
);