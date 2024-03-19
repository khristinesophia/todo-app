import { FaEdit, FaSave, FaTrash} from 'react-icons/fa'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

import { useState, useEffect } from 'react'

import DeleteModal from './DeleteModal'
import ModalComponent from './ModalComponent'

function TodoContainer() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editing, setEditing] = useState({ index: -1, title: '' })

  const [showModal, setShowModal] = useState(false)
  const [action, setAction] = useState('')

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [todoToDelete, setTodoToDelete] = useState({})

  const [incompleteTasksCount, setIncompleteTasksCount] = useState(0)

  const deleteTodo = () => {
    const updatedTodos = todos.filter((_, todoIndex) => todoIndex !== todoToDelete.index)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    setTodos(updatedTodos)
    setShowDeleteModal(false)

    setIncompleteTasksCount(todos.filter(todo => !todo.completed).length)
  }
  const handleDelete = (title, index) => {
    setTodoToDelete({ title, index })
    setShowDeleteModal(true)
  }

  
  const clearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed)
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    
    setShowModal(false)
    loadTodos()
  }
  const clearAll = () => {
    localStorage.setItem('todos', JSON.stringify([]))

    setShowModal(false)
    loadTodos()
  }
  const handleOpen = (action) => {
    setAction(action)
    setShowModal(true)
  }

  const getCurrentDate = () => {
    const date = new Date()
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    return formatter.format(date)
  }

  const incompleteAllTodos = () => {
    const updatedTodos = todos.map(todo => ({ ...todo, completed: false }))
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    setIncompleteTasksCount(updatedTodos.filter(todo => !todo.completed).length)
  }
   
   const completeAllTodos = () => {
    const updatedTodos = todos.map(todo => ({ ...todo, completed: true }))
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    setIncompleteTasksCount(updatedTodos.filter(todo => !todo.completed).length)
  }

  //- todo item completed status
  const handleToggle = (index) => {
    const updatedTodos = [...todos]
    updatedTodos[index].completed = !updatedTodos[index].completed

    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))

    setIncompleteTasksCount(todos.filter(todo => !todo.completed).length)
  }
  //- editTodo
  //- edit todo
  const editTodo = (e) => {
    e.preventDefault()

    if (editing.title.trim() === '') {
      alert('Please enter a todo item.')
      return
   }

    const updatedTodos = [...todos]
    updatedTodos[editing.index].title = editing.title

    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))

    setEditing({ index: -1, title: '' })

    setIncompleteTasksCount(todos.filter(todo => !todo.completed).length)
  }
  //- handleEdit
  //- input to appear for todo being edited
  const handleEdit = (index, title) => {
    setEditing({ index, title })
  }

  //- handleSubmit
  //- create todo
  const handleSubmit = (e) => {
    e.preventDefault()

    if (newTodo.trim() === '') {
      alert('Please enter a todo item.')
      return
    }

    const todos = JSON.parse(localStorage.getItem('todos')) || []

    const newTodoObject = {
      title: newTodo,
      dateCreated: getCurrentDate(),
      completed: false
    }

    todos.push(newTodoObject)
    localStorage.setItem('todos', JSON.stringify(todos))
    
    setNewTodo('')
    loadTodos()
  }

  //- loadTodos
  //- read all todos
  const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos) {
      setTodos(todos)
      setIncompleteTasksCount(todos.filter(todo => !todo.completed).length)
    }
  }

  useEffect(() => {
    loadTodos()
  }, [])

  const todosElement = todos.map((item, index) => {
    if (editing.index === index) {
      return (
        <tr key={index}>
          <td className='text-start px-4'>
            <form onSubmit={editTodo} className="input-group">
              <input
                type="text"
                className="form-control"
                value={editing.title}
                onChange={e => setEditing({ ...editing, title: e.target.value })}
              />
              <button 
                className="icon edit"
                type="submit"
              >
                <FaSave />
              </button>
            </form>
          </td>
          <td>{item.dateCreated}</td>
          <td>
            <button className="icon edit" onClick={() => handleEdit(index, item.title)}>
              <FaEdit />
            </button>
            <button 
              className="icon delete" 
              onClick={() => handleDelete(item.title, index)}
              >
              <FaTrash />
            </button>
          </td>
        </tr>
      )
    }
    
    else{
      return(
        <tr key={index}>
          <td className='text-start px-4'>
            <input 
              className="form-check-input me-3" 
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(index)}
            />
            <span className={`${item.completed ? 'text-decoration-line-through fst-italic' : ''}`}>
              {item.title}
            </span>
          </td>
          <td>{item.dateCreated}</td>
          <td>
            <button 
              className="icon edit"
              onClick={() => handleEdit(index, item.title)}
            >
              <FaEdit />
            </button>
            <button 
              className="icon delete"
              onClick={() => handleDelete(item.title, index)}
            >
              <FaTrash />
            </button>
          </td>
        </tr>
      )
    }
  })

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-group input-group-lg mt-3">
          <input 
            type="text" 
            className="form-control" 
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            placeholder="New todo..."
          />
          <button type="submit" className="input-group-text">+</button>
        </div>
      </form>

      <div className="card shadow mt-4 pt-3">
        <div className="d-flex justify-content-between px-4">
          <p className="badge bg-light text-dark">{incompleteTasksCount} tasks left</p>
          <div>
            <button
              className="badge bg-light text-dark mb-3"
              onClick={completeAllTodos}
            >Complete All</button>
            <button
              className="badge bg-light text-dark mb-3"
              onClick={incompleteAllTodos}
            >Incomplete All</button>
          </div>
        </div>
        <hr />

        <table className="table text-center">

          <thead>
            <tr>
            <th className="width-40">Todo</th>
            <th>Date Created</th>
            <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {todosElement}
          </tbody>
        
        </table>

        <div className="d-flex justify-content-end px-4">
          <button
            onClick={() => handleOpen('clearCompleted')}
            className="badge bg-light text-dark mb-3"
          >Clear Completed</button>
          <button
            onClick={() => handleOpen('clearAll')}
            className="badge bg-light text-dark mb-3"
          >Clear All</button>
        </div>
      </div>

      <DeleteModal
        showDeleteModal={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={deleteTodo}
      />

      <ModalComponent
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        clearAll={clearAll}
        clearCompleted={clearCompleted}
        action={action}
      />
    </>
  )
}

export default TodoContainer