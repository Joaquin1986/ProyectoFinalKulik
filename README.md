# Proyecto FINAL de React JS. Coderhouse (Comisión 47150)

[Proyecto FINAL de React JS](https://github.com/Joaquin1986/ProyectoFinalKulik) para Coderhouse / Comisión 47150. 

## Descripción de la App

Se desarrolla una APP de e-commerce en React JS que permite elegir una serie de productos, los cuales son obtenidos desde una base de datos Firestore(Firebase). Este proyecto cuenta con las implementaciones de las pre-entregas (incluyendo react-router-dom, hooks, etc.), además de haber sumado las últimas implementaciones para la última 

## Ejecución de la App

Luego de descargar o clonar el proyecto, en el directorio elegido se puede ejecutar el siguiente comando en una CLI (ya sea Poowershell, Bash o la que se elija):

### `npm start`

Este comando ejecuta la app en modo 'desarrollo'
Se puede abrir la dirección [http://localhost:3000](http://localhost:3000) para poder visualizar la app en el browser que se elija (se recomienda Chrome)

## Componentes Necesarios (NPM Import)

La App necesita la importación/import (se recomienda [NPM](https://www.npmjs.com/)) de los siguientes componentes:

✔️ react-router-dom ([https://www.npmjs.com/package/react-router-dom](https://www.npmjs.com/package/react-router-dom))<br>
✔️ react-bootstrap ([https://react-bootstrap.netlify.app/](https://react-bootstrap.netlify.app/))<br>
✔️ firebase/firestore ([https://firebase.google.com/docs/firestore](https://firebase.google.com/docs/firestore))<br>
✔️ sweetalert2 ([https://github.com/sweetalert2/sweetalert2-react-content](https://github.com/sweetalert2/sweetalert2-react-content))<br>

## Componentes JSX de la App

La App está desarrollada con los siguientes Componentes JSX, cuyo funcionamiento o descripción se detalla a continuación.

### `CartContext.jsx`

Es el proveedor del Contexto del Cart para aquellos módulos que lo necesiten. Cuenta con funciones que:

✔️ Devuelve la cantidad de elementos agregados en el carrito - totalWidget()<br>
✔️ Agrega elementos al carrito, pasándole como argumentos el objeto 'producto' y la cantidad del mismo - addItem(product, quantity)<br>
✔️ Quita elementos del carrito, pasándole como argumento el id del 'producto' que se desea remover o quitar - removeItem(id)<br>
✔️ Limpia los elementos del carrito, luego de efectuar una compra - clear()<br>
✔️ Devuelve valor 'boolean' ('true' o 'false') en caso de que un producto esté o no en el carrito, pasándole como argumento el id del producto - isInCart(id)<br>
✔️ Devuelve el precio total de la orden o pedido - totalPrice()<br>

### `NavBar.jsx`

Es el componente que renderiza el navbar de la App.

### `ItemListContainer.jsx`

Realiza la consulta de la colección 'products' a la base de datos (firebase) y pasa como 'prop' la lista de productos obtenida al componente 'ItemList.jsx'. La lista puede ser de  forma general (sin filtro de categoría) o de forma específica (con filtro de categoría por 'id' de la misma).

### `ItemList.jsx`

Renderiza la lista de productos que recibe como 'prop' y a la vez pasa esa misma 'prop' que recibe al componente 'Item.jsx' para que lo procese.
 

### `ItemDetailContainer.jsx`

Realiza la consulta de un elemento específico de la colección 'products' a la base de datos (firebase) y pasa como 'prop' el producto obtenido al componente 'ItemDetail.jsx'. 

### `ItemDetail.jsx`

Renderiza la card del producto que recibe como 'prop' y a la vez pasa esa misma 'prop' que recibe al componente 'ItemCount.jsx' para que lo procese.

### `ItemCount.jsx`

Renderiza el panel que muestra la cantidad de productos seleccionados, y los botones para sumar, restar y agregar productos en el carrito. Cuenta con funciones que:

✔️ Resta (-1) la cantidad del producto seleccionado cuando se dispara el evento onClick - handleDecreaseCount()<br>
✔️ Suma (+1) la cantidad del producto seleccionado cuando se dispara el evento onClick - handleIncreaseCount()<br>

### `Item.jsx`

Renderiza la card del producto que recibe como 'prop' desde el componente 'ItemList.jsx"

### `CartWidget.jsx`

Renderiza el Widget del carrito ubicado sobre la derecha en el navbar

### `Cart.jsx`

Renderiza el detalle del carrito y el formulario para introducir los datos de la orden, dentro del CartWiget del navbar.

## Estilos CSS

Los estilos CSS de la App están configurados en el archivo 'App.css' bajo 'src'.
