import { ReactComponent as CarroSvg } from '../img/cart.svg';
import { Cart } from './Cart';
import { NavCartCount } from './NavCartCount';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

export const CartWidget = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCallback = () => setShow(false);
    return (
        <>
            <CarroSvg onClick={handleShow} />
            <NavCartCount onClick={handleShow} />
            <Offcanvas placement={'end'} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Cart handleCallback={handleCallback} />
                </Offcanvas.Body>
            </Offcanvas>

        </>
    )
}

