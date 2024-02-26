import React, { useState } from "react";
import { data } from "./data";

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [showSummary, setShowSummary] = useState(false); //controla si se muestra el resumen de un producto
  const [selectedProduct, setSelectedProduct] = useState(null); //almacena el producto del que se esta mostrando el resumen

   //--> Punto 4. Funciones y eventos para acciones 
   //Funcion para añadir el prodcuto al carrito mediante el boton
  const onAddProduct = (product) => { 
    const existingProduct = allProducts.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedProducts = allProducts.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + product.price };
        }
        return item;
      });
      setTotal(total + product.price); // Incrementa el total al agregar un nuevo producto
      setCountProducts(countProducts + 1); // Incrementa el contador de productos
      return setAllProducts(updatedProducts);
    }
    const newProduct = { ...product, quantity: 1, totalPrice: product.price };
    setTotal(total + product.price); // Incrementa el total al agregar un nuevo producto
    setCountProducts(countProducts + 1); // Incrementa el contador de productos
    setAllProducts([...allProducts, newProduct]);
  };
  
  const onAddSummary = (product, event) => { //Funcion que se activa cuando se da click en la imagen del producto
    setSelectedProduct(product);
    const rect = event.target.getBoundingClientRect();
    setShowSummary(true);
  };

  const onCloseSummary = () => {
    setShowSummary(false);
  };

  // Punto 4 <-- 

  return (
    <div className="container-items">
      {data.map((product) => (
        <div className="item" key={product.id}>
          <figure onClick={(event) => onAddSummary(product, event)}>
            <img src={product.urlImage} alt={product.title} />
          </figure>
          <div className="info-product">
           
            <h2>{product.title}</h2>
            <p className="price"><span>{product.oferta}</span> ${product.price}</p>
             {/* Contenedor del resumen dentro del bucle de mapeo */}
           {showSummary && selectedProduct.id === product.id && (
            <div
              className="summary-overlay"
              onClick={onCloseSummary}
            >
              <div className="summary-content">
                <p>{selectedProduct.resumen}</p>
                <button onClick={onCloseSummary}>Cerrar</button>
              </div>
            </div>
          )}
            <button onClick={() => onAddProduct(product)}>
              Añadir al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
