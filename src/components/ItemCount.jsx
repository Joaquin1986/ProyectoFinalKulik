import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const stock = 5;

export const ItemCount = () => {
    const [count, setCount] = useState(0);

    const handleDecreaseCount = () => {
        count > 0 ? setCount((prev) => prev - 1) : alert("Acción no permitida");
    }

    const handleIncreaseCount = () => {
        stock > count ? setCount((prev) => prev + 1) : alert(`No se puede superar el stock disponible (${stock})`);
    }

    const onAdd = () => {
        alert("+" + count + "productos al carrito");
    }

    return (
        <div className='itemCount'>
            <span className='itemCountPanel' onClick={handleDecreaseCount}>-</span>
            <span className='itemCountPanel'>{count}</span>
            <span className='itemCountPanel' onClick={handleIncreaseCount}>+</span>
            <Button variant="primary" onClick={onAdd}>Agregar al carrito</Button>{' '}
        </div>
    );
}