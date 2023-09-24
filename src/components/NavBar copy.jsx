import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CartWidget } from './CartWidget.jsx';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
//import data from "../data/products.json";
import { getFirestore, getDocs, collection } from 'firebase/firestore';

export const NavBar = () => {
    const [data, setData] = useState([]);
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
    } else {
        <div>Loading...</div>
    }
}