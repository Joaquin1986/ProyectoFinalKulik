import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import data from "../data/products.json";
import { ItemDetail } from './ItemDetail';
import { useParams } from 'react-router-dom';

export const ItemDetailContainer = () => {
    const [product, setProduct] = useState([]);
    const { itemId } = useParams();

    useEffect(() => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                const productById =  data.find((product) => Number(product.id) === Number(itemId));
                resolve(productById);
            }, 2000);
        });

        promise.then(data => setProduct(data));
    }, [itemId]);

    if (product.length < 1) {
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