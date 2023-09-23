import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext'
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const Cart = (handleCallback) => {
    const { totalWidget, items, removeItem, totalPrice, clear } = useContext(CartContext)
    const MySwal = withReactContent(Swal)
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        phone: "",
    })
    const checkout = () => {
        const order = {
            buyer: formValues,
            items: items,
            total: totalPrice(),
            date: serverTimestamp()
        }
        const db = getFirestore();
        const orderCollection = collection(db, "orders");
        addDoc(orderCollection, order).then(({ id }) => {
            if (id) {
                MySwal.fire({
                    title: <strong>Orden enviada!</strong>,
                    html: `Su orden ${id} ha sido creada!<br>Gracias por comprar, ${order.buyer.name}!`,
                    icon: 'success'
                })
                setFormValues({
                    name: "",
                    email: "",
                    phone: "",
                })
                clear()
            }
        });
    }
    const handleChange = ev => {
        setFormValues(prev => ({
            ...prev, [ev.target.name]: ev.target.value,
        }))
    }
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
                        <Form.Control type="text" placeholder="Su nombre aquí" value={formValues.name} onChange={handleChange} name='name' />
                        <Form.Text className="text-muted">
                            Ingrese su nombre completo (nombre y apellido)
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label><strong>E-mail:</strong></Form.Label>
                        <Form.Control type="email" placeholder="Tu e-mail aquí" value={formValues.email} onChange={handleChange} name='email' />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label><strong>Teléfono:</strong></Form.Label>
                        <Form.Control type="text" placeholder="Tu teléfono aquí" name='phone' value={formValues.phone} onChange={handleChange} />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" className='makeOrderButton' onClick={checkout}>
                            Realizar compra
                        </Button>
                    </div>
                </Form>
            </Container>
        )
    }
}