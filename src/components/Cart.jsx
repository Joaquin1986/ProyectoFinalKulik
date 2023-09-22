import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext'
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';


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
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label><strong>Nombre:</strong></Form.Label>
                        <Form.Control type="name" placeholder="Su nombre aquí" required />
                        <Form.Text className="text-muted">
                            Ingrese su nombre completo (nombre y apellido)
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label><strong>E-mail:</strong></Form.Label>
                        <Form.Control type="email" placeholder="Tu e-mail aquí" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label><strong>Teléfono:</strong></Form.Label>
                        <Form.Control type="phone" placeholder="Tu teléfono aquí" required />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" className='makeOrderButton' onClick={() => alert("Se realiza pedido")}>
                            Realizar compra
                        </Button>
                    </div>
                </Form>
            </Container>
        )
    }
}