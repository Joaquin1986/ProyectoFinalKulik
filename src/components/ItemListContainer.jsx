import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';

import data from "../data/products.json";

import { ItemList } from './ItemList';

export const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(data), 2000);
        });
        promise.then(data => {
            if (!id) {
                setProducts(data);
            } else {
                const productsFiltered = data.filter(
                    (product) => product.category === id
                );
                setProducts(productsFiltered);
            }   
        });
    }, [id]);

    if (products.length === 0) {
        return <h1 className='loadingTitle'>Loading...</h1>
    } else {
        return (
            <Container fluid="md">
                <div className='itemListContainer'>
                    <ItemList products={products} />
                </div>
            </Container>
        );
    }
}