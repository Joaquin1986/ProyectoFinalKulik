import { Item } from "./Item";

export const ItemList = ({ products }) =>
    products.map((product) => (
        <div key={product.id} className='productDiv'>
            <Item product={product} key={product.id} />
        </div>
    ));