import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext'

export const NavCartCount = () => {
    const { totalWidget } = useContext(CartContext);
    return (
        <>
            <p className="navCartCount">{totalWidget()}</p>
        </>
    )
} 