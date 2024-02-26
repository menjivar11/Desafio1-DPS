"use client";
import React, { useState, useEffect } from "react";
import { Headers } from "./components/Headers";
import { ProductList } from "./components/ProductList";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  
  // --> Punto 3. Almacenamiento de datos con json
  // Cargar datos del carrito desde el almacenamiento local al cargar la página utilizando UseEffect 
  useEffect(() => {
    const storedData = localStorage.getItem("cartData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setAllProducts(parsedData.allProducts);
      setTotal(parsedData.total);
      setCountProducts(parsedData.countProducts);
    }
  }, []);

  // Guardar datos del carrito en el almacenamiento local cuando cambien
  useEffect(() => {
    localStorage.setItem(
      "cartData",
      JSON.stringify({ allProducts, total, countProducts })
    );
  }, [allProducts, total, countProducts]);

  // Punto 3 <--

  return (
    <>
      <Headers
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />
      <ProductList
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />

      
    </>
  );
}

