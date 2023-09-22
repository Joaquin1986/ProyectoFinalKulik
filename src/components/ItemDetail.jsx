import Card from 'react-bootstrap/Card'
import { ItemCount } from './ItemCount'

export const ItemDetail = ({ product }) => {
    return (
        <div className='itemDetail'>
            <Card key={product.id} id={product.id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.imageId} />
                <Card.Body>
                    <Card.Title>{product.title} ({product.description})</Card.Title>
                    <Card.Text>{"Categoría: " + product.categoryId}</Card.Text>
                    <Card.Text>{"Precio: " + product.price}</Card.Text>
                    <Card.Text>{"Stock disponible: " + product.stock}</Card.Text>
                    <ItemCount product={product} />
                </Card.Body>
            </Card>
        </div>
    )
}