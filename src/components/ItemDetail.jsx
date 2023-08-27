export const ItemDetail = ({ product }) => (
    <div className='itemDetailContainer'>
        <h1>{product.prod_name}</h1>
        <img src={product.imgUrl} alt={"imagen de " + product.prod_name} />
    </div>
);