import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import data from "../data/products.json";
import { ItemDetail } from './ItemDetail';

export const ItemDetailContainer = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(data.at(2)), 2000);
        });

        promise.then(data => setProduct(data));
    }, []);

    if (product.length === 0) {
        return <h1 className='loadingTitle'>Loading...</h1>
    }
    else {
        return (
            <Container fluid="md">
                <ItemDetail product={product} />
            </Container>
        );
    }
}