import { createContext, useState } from "react";
import Swal from 'sweetalert2';

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2000
    })

    const totalWidget = () => {
        if (items.length) {
            return items.reduce((act, item) => act + item.quantity, 0)
        } else {
            return 0;
        }
    }

    const addItem = (product, quantity) => {
        if (quantity > 0) {
            if (!isInCart(product.id)) {
                setItems(prev => [...prev, { ...product, quantity }]);

            }
            else {
                let newItemList = [];
                let prevQuantity, newQuantity;
                items.forEach((item) => {
                    if (product.id === item.id) {
                        prevQuantity = item.quantity;
                        newQuantity = parseInt(prevQuantity + quantity);
                        newItemList = items.filter((element) => element.id !== item.id);
                        const currentItem = item;
                        currentItem.quantity = newQuantity
                        newItemList.push(currentItem);
                        setItems(newItemList);
                    }
                })
            }
            Toast.fire({
                icon: 'success',
                title: `+${quantity} de ${product.title} al carrito`
            })
        } else {
            Toast.fire({
                icon: 'error',
                title: `Error: cantidad nula`
            })
        }

    }

    const removeItem = (id) => {
        const filteredItems = items.filter(item => item.id !== id);
        setItems(filteredItems);
    }

    const clear = () => setItems([]);

    const isInCart = (id) => {
        let productFound = false;
        items.forEach((item) =>
            item.id === id ? productFound = true : productFound = false
        )
        return productFound;
    }

    const totalPrice = () => {
        let returnPrice = 0;
        items.forEach((item) => {
            returnPrice += item.quantity * item.price;
        })
        return returnPrice;
    }

    return (
        <CartContext.Provider value={{ addItem, removeItem, clear, totalWidget, items, totalPrice }}>{children}</CartContext.Provider >
    )
}