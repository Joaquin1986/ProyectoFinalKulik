import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext'
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


export const Cart = (handleCallback) => {
    const { totalWidget, items, removeItem, totalPrice } = useContext(CartContext)
    if (totalWidget() === 0) {
        return (
            <Container className='cartDiv'>
                <h4> Carrito vacío: no hay ítems </h4>
                <NavLink to="/" className='cartBackLink'> <Button variant="primary" className='backButton' onClick={handleCallback}>Volver a inicio</Button>{' '}</NavLink>
            </Container>
        )
    } else {
        return (
            <Container>
                <h4> Carrito de compras. </h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>¿Quitar?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td><Button variant="primary" className='itemDelete' onClick={() => removeItem(item.id)}>Quitar</Button></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={4}>Precio total: ${totalPrice()}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        )
    }
}