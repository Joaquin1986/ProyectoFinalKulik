import { ReactComponent as CarroSvg } from '../img/cart.svg';
import { Cart } from './Cart';
import { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext'
import Offcanvas from 'react-bootstrap/Offcanvas';

export const CartWidget = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCallback = () => setShow(false);
    const { totalWidget } = useContext(CartContext);
    return (
        <>
            <CarroSvg onClick={handleShow} />
            <p className="navCartCount" onClick={handleShow}>{totalWidget() > 0 ? totalWidget() : null}</p>
            <Offcanvas placement={'end'} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Cart onCart={handleCallback} />
                </Offcanvas.Body>
            </Offcanvas>

        </>
    )
}

