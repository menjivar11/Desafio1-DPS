"use client"
import React, {useState} from 'react'
import Todo from './Todo'
import styles from "../app/page.module.css"
import Select from 'react-select'

const options = [
    {label: "Peli 1", value: 1},
    {label: "Peli 2", value: 2},
    {label: "Peli 3", value: 3},
    {label: "Peli 4", value: 4},
    {label: "Peli 5", value: 5},
    {label: "Peli 6", value: 6},
    {label: "Peli 7", value: 7},
    {label: "Peli 8", value: 8},
    {label: "Peli 9", value: 9},
    {label: "Peli 10", value: 10}]

const Form = () => {

    const deleteTodo=indice=>{
        const newTodos = [...todos]
        newTodos.splice(indice,1)
        setTodos(newTodos)
    }

    const[valor,setValor]=useState();
    
    const handleSelectChange = ({value}) =>{
        console.log(value);
        setValor(value);
    }

    return (
        <>
        <form>
            <br/>
            <div>
                <Select
                    options = {options}
                    onChange={handleSelectChange}
                    />
            </div>
            <p>
                Nombre: {valor}
            </p>

        </form>
            
        </>
    )
}
export default Form