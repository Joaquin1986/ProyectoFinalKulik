import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ReactComponent as CarroSvg } from '../img/cart.svg';

const Carro = ({callback}) => <CarroSvg onClick={callback} />;
const ItemCount = ({callback}) => <p class="itemCount" onClick={callback}>0</p>;

export default function NavBar({texto}) {
    const handleClick = () =>{
        alert (texto);
    }
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#preentrega1">Pre Entrega 1</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#productos">Productos</Nav.Link>
                        <Nav.Link href="#categorias">Categorías</Nav.Link>
                        <Carro callback={handleClick} />
                        <ItemCount callback={handleClick} />
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}