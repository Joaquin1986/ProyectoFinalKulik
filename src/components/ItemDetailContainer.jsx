import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { ItemDetail } from './ItemDetail';
import { useParams } from 'react-router-dom';
import { getFirestore, getDoc, doc } from 'firebase/firestore';

export const ItemDetailContainer = () => {
    const [product, setProduct] = useState([]);
    const { itemId } = useParams();

    useEffect(() => {
        const db = getFirestore();
        const refDoc = doc(db, "productos", itemId);
        getDoc(refDoc).then((snapshot) => {
            setProduct({ id: snapshot.id, ...snapshot.data() });
        });
    }, []);

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