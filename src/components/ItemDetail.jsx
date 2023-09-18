import Card from 'react-bootstrap/Card'
import { ItemCount } from './ItemCount'

export const ItemDetail = ({ product }) => {
    return (
        <div className='itemDetail'>
            <Card key={product.id} id={product.id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.imgUrl} />
                <Card.Body>
                    <Card.Title>{product.prod_name}</Card.Title>
                    <Card.Text>{"Categoría: " + product.category}</Card.Text>
                    <Card.Text>{"Stock disponible: " + product.stock}</Card.Text>
                    <ItemCount product={product} />
                </Card.Body>
            </Card>
        </div>
    )
}