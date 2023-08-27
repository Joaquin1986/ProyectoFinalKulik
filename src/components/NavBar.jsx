import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Carro } from './CartWidget.jsx';
import { NavCartCount } from './NavCartCount.jsx';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { NavLink } from 'react-router-dom';
import data from "../data/products.json";

export const NavBar = ({ texto }) => {
    const MySwal = withReactContent(Swal)
    const handleClick = () => {
        MySwal.fire({
            title: <strong>Prueba de Props</strong>,
            html: texto,
            icon: 'success'
        })
    }
    const categories = data.map(product => product.category);
    const filteredCategories = new Set(categories);

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <NavLink to="/" className='nav-link-title'><strong>Mi E-Commerce</strong></NavLink>
                    <Nav className="me-auto">
                        {[...filteredCategories].map(category => (
                            <NavLink key={category} to={`/category/${category}`} className='nav-link'>{category}</NavLink>
                        ))} 
                        <Carro callback={handleClick} />
                        <NavCartCount callback={handleClick} />
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}