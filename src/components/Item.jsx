import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {ItemCount} from './ItemCount'

export const Item = ({ product }) => (
    <Card key={product.id} id={product.id} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={product.imgUrl} />
        <Card.Body>
            <Card.Title>{product.prod_name}</Card.Title>
            <Card.Text>{product.category}</Card.Text>
            <Button className='viewProduct' variant="primary">Ver Producto</Button>
        </Card.Body>
    </Card>
);