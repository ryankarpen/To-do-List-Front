import { Link } from "react-router-dom"

import './Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
        <h2>
            <Link to="/tasks">Lista de Tarefas</Link>
        </h2>
        <nav>
            <ul>
                <li>
                    <Link to="/tasks">Minhas tarefas</Link>
                </li>
                <li>
                    <Link to="/new">Nova tarefa</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar