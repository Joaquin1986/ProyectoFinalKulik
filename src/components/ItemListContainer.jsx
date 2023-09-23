import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { ItemList } from './ItemList';

export const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const db = getFirestore();
        const refCollection = collection(db, "productos");
        getDocs(refCollection).then((snapshot) => {
            if (snapshot.size === 0) {
                console.warn("no hay resultados")
            } else {
                if (id === undefined) {
                    setProducts(
                        snapshot.docs.map((doc) => {
                            return { id: doc.id, ...doc.data() };
                        })
                    );
                } else {
                    let filteredProducts = [];
                    snapshot.docs.forEach((doc) => {
                        if (doc.data().categoryId === id) {
                            filteredProducts.push({ id: doc.id, ...doc.data() });
                        }
                    });
                    setProducts(filteredProducts);
                }
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