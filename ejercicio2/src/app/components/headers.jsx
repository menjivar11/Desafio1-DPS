import { useState } from "react";
import InputC from "./inputc";

export const Headers = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {
  const [active, setActive] = useState(false);

  //--> Punto 4. Funciones y eventos para acciones 
  const onDeleteProduct = (product) => {
    if (
      window.confirm(
        "¿Estás seguro que quieres eliminar este artículo del carrito de compras?"
      )
    ) {

  // Punto 4 <--    

      //  --> Punto 3. Almacenamiento de datos con json
      //Actualizar datos que se eliminan en el carrito mediante el ID
      const updatedProducts = allProducts.filter((item) => item.id !== product.id);
      //Luego se actualiza el estado de cada uno de los datos 
      setTotal(total - product.price * product.quantity);
      setCountProducts(countProducts - product.quantity);
      setAllProducts(updatedProducts);

      // Guardar datos actualizados del carrito en el almacenamiento local
      localStorage.setItem(
        "cartData",
        JSON.stringify({ allProducts: updatedProducts, total, countProducts })
      );
    }
    // Punto 3 <--
  };

  //--> Punto 4. Funciones y eventos para acciones 
  const onCleanCart = () => {
    if (window.confirm('¿Estás seguro que quiere vaciar el carrito de compras?')) {
      setAllProducts([]);
      setTotal(0);
      setCountProducts(0);
    }
  };

  //Actualiza la cantidad de un producto en el carrito
  const updateQuantity = (event, product) => {
    const newQuantity = parseInt(event.target.value); 
    if (!isNaN(newQuantity) && newQuantity >= 0) { //Verifica que el valor sea un numero valido
      const updatedProducts = allProducts.map((item) => { //Nuevo array basado en allproducts
        if (item.id === product.id) {
          const totalPrice = newQuantity * item.price;
          return { ...item, quantity: newQuantity, totalPrice: totalPrice };
        }
        return item;
      });

      setAllProducts(updatedProducts);
      setCountProducts(
        updatedProducts.reduce((acc, curr) => acc + curr.quantity, 0) //Actualiza el contador sumando las cantidades 
      );
      setTotal(
        updatedProducts.reduce((acc, curr) => acc + curr.totalPrice, 0) //Actualiza el total sumando precios totales 
      );
    }
  };

  // Punto 4 <--    

  return (
    <header>
      <h1> Jaguar Sport</h1>
      <img src="https://cdn.leonardo.ai/users/c5a196df-6a47-440e-bfcb-614112e63f92/generations/7ad0167c-aa2a-4a51-bcc9-46ac5c1cddf2/variations/Default_Logo_para_tienda_deportiva_llamada_Jaguar_Sports_3_7ad0167c-aa2a-4a51-bcc9-46ac5c1cddf2_0.png" alt="Logo de la tienda" className="logo" />
      <div className="container-icon">
        <div className="container-cart-icon" onClick={() => setActive(!active)}>
          <img
            src="https://e7.pngegg.com/pngimages/833/426/png-clipart-black-shopping-cart-icon-for-free-black-shopping-cart.png"
            alt="carrito"
            className="icon-cart"
          />
          <div className="count-products">
            <span id="contador-productos">{countProducts}</span>
          </div>
        </div>
        <div className={`container-cart-products ${active ? "" : "hidden-cart"}`}>
          {allProducts.length ? (
            <>
              <div className="row-product">
                {allProducts.map((product) => (
                  <div className="cart-product" key={product.id}>
                    <div className="info-cart-product">
                      <img src={product.urlImage} alt={product.title} />
                      <p className="titulo-producto-carrito">{product.title}</p>
                      <span className="precio-producto-carrito">
                        ${product.totalPrice}
                      </span>
                    </div>

                    <InputC
                      product={product}
                      updateQuantity={updateQuantity}
                    />

                    <img
                      src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
                      alt="cerrar"
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)}
                    />
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <h3>Total:</h3>
                <span className="total-pagar">${total}</span>
              </div>
              <button className="btn-clear-all" onClick={onCleanCart}>
                Vaciar Carrito
              </button>
            </>
          ) : (
            <p className="cart-empty">El carrito está vacío</p>
          )}
        </div>
      </div>
    </header>
  );
};
