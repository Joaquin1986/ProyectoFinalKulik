import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom'

export const ItemCount = ({ product }) => {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    const handleDecreaseCount = () => {
        count > 0 ? setCount((prev) => prev - 1) :
            Swal.fire({
                title: "Error: acción no permitida",
                html: `No se pueden seleccionar valores negativos`,
                icon: 'error'
            })
    }

    const handleIncreaseCount = () => {
        product.stock > count ? setCount((prev) => prev + 1) :
            Swal.fire({
                title: "Error: Stock no disponible",
                html: `No se puede superar el stock disponible (${product.stock}) `,
                icon: 'error'
            })
    }

    const onAdd = (product) => {
        if (count > 0) {
            const MySwal = withReactContent(Swal)
            MySwal.fire({
                title: <strong>Producto agregado: {product.prod_name}</strong>,
                html: `+${count} ${product.prod_name} al carrito`,
                icon: 'success'
            })
        } else {
            const MySwal = withReactContent(Swal)
            MySwal.fire({
                title: <strong>Error al agregar: {product.prod_name}</strong>,
                html: "No se puede agregar cantidad nula",
                icon: 'error'
            })
        }
    }

    return (
        <div className='itemCount'>
            <span className='itemCountPanel' onClick={handleDecreaseCount}><button>-</button></span>
            <span className='itemCountNumber'>{count}</span>
            <span className='itemCountPanel' onClick={handleIncreaseCount}><button>+</button></span>
            <Button variant="primary" className='itemCountAdd' onClick={() => onAdd(product)}>Agregar al carrito</Button>{' '}
            <Button variant="primary" className='backButton' onClick={() => navigate(-1)}>Volver</Button>{' '}
        </div>
    );
}