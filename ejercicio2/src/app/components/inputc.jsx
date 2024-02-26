import React from "react";


const InputC = ({ product, updateQuantity }) => {
  const handleQuantityChange = (event) => { //Funcion que se activa cuando cambie el valor del elemento
    updateQuantity(event, product);
  };

  return (
    <input
      type="number"
      value={product.quantity}
      onChange={handleQuantityChange}
      className="cantidad-producto-carrito"
    />
  );
};

export default InputC;

