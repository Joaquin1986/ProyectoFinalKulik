import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const Item = ({ product }) => (
    <Card key={product.id} id={product.id} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={product.imgUrl} />
        <Card.Body>
            <Card.Title>{product.prod_name}</Card.Title>
            <Card.Text>{product.category}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
    </Card>
);