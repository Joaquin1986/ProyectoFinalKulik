import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Carro } from './CartWidget.jsx';
import { NavCartCount } from './NavCartCount.jsx';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const NavBar = ({ texto }) => {
    const MySwal = withReactContent(Swal)
    const handleClick = () => {
        MySwal.fire({
            title: <strong>Prueba de Props</strong>,
            html: texto,
            icon: 'success'
        })
    }
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#preentrega1">Mi E-Commerce</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#inicio">Inicio</Nav.Link>
                        <Nav.Link href="#productos">Productos</Nav.Link>
                        <Nav.Link href="#categorys">Categorías</Nav.Link>
                        <Nav.Link href="#contactox">Contacto</Nav.Link>
                        <Carro callback={handleClick} />
                        <NavCartCount callback={handleClick} />
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}