import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext'


export const ItemCount = ({ product }) => {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const { addItem } = useContext(CartContext)
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2000
    })
    const handleDecreaseCount = () => {
        count > 0 ? setCount((prev) => prev - 1) :
            Toast.fire({
                icon: 'error',
                title: `Error: cantidad negativa`
            })
    }
    const handleIncreaseCount = () => {
        product.stock > count ? setCount((prev) => prev + 1) :
            Toast.fire({
                icon: 'error',
                title: `Error: supera stock (${product.stock})`
            })
    }
    return (
        <div className='itemCount'>
            <span className='itemCountPanel' onClick={handleDecreaseCount}><button>-</button></span>
            <span className='itemCountNumber'><strong>{count}</strong></span>
            <span className='itemCountPanel' onClick={handleIncreaseCount}><button>+</button></span>
            <Button variant="primary" className='itemCountAdd' onClick={() => addItem(product,count)} >Agregar al carrito</Button>{' '}
            <Button variant="primary" className='backButton' onClick={() => navigate(-1)}>Volver</Button>{' '}
        </div>
    );
}