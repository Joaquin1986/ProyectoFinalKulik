import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CartWidget } from './CartWidget.jsx';
import { NavLink } from 'react-router-dom';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import Logo from '../img/logo.jpg';
import Logo2 from '../img/logo2.jpg';

export const NavBar = () => {
    const [data, setData] = useState([]);
    const [logoHover, setlogoHover] = useState(false);
    const handleHover = () => {
        setlogoHover(!logoHover);
    };
    useEffect(() => {
        const db = getFirestore();
        const refCollection = collection(db, "productos");
        getDocs(refCollection).then((snapshot) => {
            const dataInt = [];
            snapshot.docs.forEach((doc) => {
                dataInt.push(doc.data());
            });
            setData(dataInt);
        });
    }, []);
    if (data.length > 0) {
        const categories = data.map(product => product.categoryId);
        const filteredCategories = new Set(categories);
        return (
            <>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <NavLink to="/" className='nav-link-title'><img src={!logoHover ? Logo : Logo2} alt='Logo de e-Almacen' onMouseEnter={handleHover} onMouseLeave={handleHover} className='logo'></img></NavLink>
                        <Nav className="me-auto">
                            {[...filteredCategories].map(category => (
                                <NavLink key={category} to={`/category/${category}`} className='nav-link'><strong>{category}</strong></NavLink>
                            ))}
                            <CartWidget />
                        </Nav>
                    </Container>
                </Navbar>
            </>
        );
    } else {
        <div>Loading...</div>
    }
}