import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import data from "../data/products.json";

import { ItemList } from './ItemList';

export const ItemListContainer = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(data), 2000);
        });

        promise.then(data => setProducts(data));
    }, []);

    return (
        <Container fluid="md">
            <div className='itemListContainer'>
                <ItemList products = {products} />
            </div>
        </Container>
    );
}