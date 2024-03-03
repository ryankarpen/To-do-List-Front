import React, {useState, useEffect} from 'react'
import { HiCheck } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

import { FormType } from '../types/FormType'
import Star from '../components/Star';
import Search from '../components/Search';

import useToast from '../hooks/useToast';

import './Tasks.css'


const Tasks = () => {


  const [data, setData] = useState<FormType[] | null>(null)
  const [searchData, setSearchData] = useState<FormType[] | null>(null)
  const [deletedTask, setDeletedTask] = useState<FormType[] | null>(null)
  const [completedTask, setCompletedTask] = useState<FormType[] | null>(null)



  useEffect(() => {

    const getTasks = async () => {


      const res = await fetch("https://to-do-list-api-1.onrender.com/api/tasks")
      const data = await res.json()

      setData(data)
    }

    getTasks()
  }, [deletedTask, completedTask])



  const deleteTask = async (id?: string | null) => {
    
    try {

      const res  = await fetch(`https://to-do-list-api-1.onrender.com/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const data = await res.json()
    setDeletedTask(data)

    if(res.status === 200){
      useToast('Tarefa excluída com sucesso')
    }
      
    } catch (error) {
      useToast("Tarefa não encontrada", "error")
    }

  }



  const completeTask = async (name?:string, description?: string, rating?: string, color?: string, id?: string) => {

    const data = {
      name,
      description,
      rating,
      color,
      isDone: "done",
    }

    const res = await fetch(`https://to-do-list-api-1.onrender.com/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })


    const response = await res.json()

    setCompletedTask(response)
  }


  const loadTasks = async (e: React.FormEvent<HTMLFormElement>, rating?: string[], status?: string[]) => {
    e.preventDefault()
    

    const res = await fetch("https://to-do-list-api-1.onrender.com/api/tasks")

    const data = await res.json()

    if(rating?.length === 0 || status?.length === 0){
      useToast("Preencha todos os filtros", 'alert')
      return
    }

    if(rating && status){
      setSearchData(data.filter((task: FormType) => rating.includes(task.rating) && status.includes(task.isDone ?? "")))
    }
   
  }


  if(!data) return <p>Carregando...</p>
    
  return (
    <div className='container'>
      <Search loadTasks={loadTasks}/>
      <div className="task-container">
        {searchData ? searchData.map((task: FormType) => (
          <div key={task._id} className={task.isDone === "unfinished" ? "task-component": "task-component task-complete"} style={{backgroundColor: task.color}}>
            <h3>{task.name}</h3>
            <span className='options'>
              <IoMdClose onClick={() => deleteTask(task._id)}/>
              <HiCheck onClick={() => completeTask(task.name, task.description, task.rating, task.color, task._id)}/>
            </span>
            <p>{task.description}</p>
            <span>
              <Star rating={task.rating}/>
            </span>
          </div>
      )): data.map((task: FormType) => (
        <div key={task._id} className={task.isDone === "unfinished" ? "task-component": "task-component task-complete"} style={{backgroundColor: task.color}}>
          <h3>{task.name}</h3>
          <span className='options'>
            <IoMdClose onClick={() => deleteTask(task._id)}/>
            <HiCheck onClick={() => completeTask(task.name, task.description, task.rating, task.color, task._id)}/>
          </span>
          <p>{task.description}</p>
          <span>
            <Star rating={task.rating}/>
          </span>
        </div>
    ))}
      </div>
    </div>
  )
}

export default Tasks