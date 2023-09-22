import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CartWidget } from './CartWidget.jsx';
import { NavLink } from 'react-router-dom';
import data from "../data/products.json";

export const NavBar = ({ texto }) => {
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
                        <CartWidget />
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}