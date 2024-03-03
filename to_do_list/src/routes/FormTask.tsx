import { useState, FormEvent } from 'react'

import {FormType} from '../types/FormType'
import { useNavigate } from 'react-router-dom'
import useToast from '../hooks/useToast'


import './FormTask.css'

const FormTask = () => {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState("")
  const [color, setColor] = useState("")


  const data: FormType = {
    name, 
    description,
    rating,
    color,
    isDone: "unfinished",
  }




  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

      try {

        const res = await fetch("https://to-do-list-api-1.onrender.com/api/tasks", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

      })


      if(res.status === 201){
        navigate("/tasks")

        useToast('Tarefa cadastrada com sucesso')
        
      }
        
      } catch (error) {
        useToast('Ocorreu um erro na hora de cadastrar a tarefa', 'error')
      }   
    
  }

  return (
    <div className='form-container'>
      <h3>Cadastrar nova tarefa</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-component">
          <label htmlFor="name">Nome da tarefa</label>
          <input type="text" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="form-component">
          <label htmlFor="description">Descrição</label>
          <textarea name="description" id="description" onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div className="form-component">
          <label htmlFor="rating">Classificação</label>
          <select name="rating" id="rating" onChange={(e) => setRating(e.target.value)}>
            <option value="very_important">Muito importante</option>
            <option value="important">Importante</option>
            <option value="medium">Mediana</option>
            <option value="slightly_important">Pouco importante</option>
            <option value="not_important">Não tão importante</option>
          </select>
        </div>
        <div className="form-component">
          <label htmlFor="color_task">Cor da tarefa</label>
          <input type="color" onChange={(e) => setColor(e.target.value)}/>
        </div>
        <input type="submit" value="Cadastrar" className='green-button'/>
      </form>
    </div>
  )
}

export default FormTask