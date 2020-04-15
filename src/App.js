import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt as farTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';
import './App.css';

import { eventEmitter } from './events/index'
import { Modal } from './components/modal';

function App() {
  const [users, setUsers] = useState()
  const [user, setUser] = useState()
  const [modal, setModal] = useState(false)

  const handleDelete = (id) => {
    eventEmitter.send('delete-user', {_id: id})
  }

  const handleEdit = (newUser) => {
    eventEmitter.send('put-user', {_id: newUser._id}, newUser)
  }

  const closeModal = () => {
    setModal(false)
  }
  const openModal = (user) => {
    setUser(user)
    setModal(true)
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    eventEmitter.send('get-all')

    eventEmitter.on('get-all', (event, docs) => {
      setUsers(docs)
   })
  },[users])
  
  return (
    <div className="App">
      <header className="App-header">
        <p>React Electron Boilerplate</p>
          <table className="default-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Nacionalidade</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <span>{user.name}</span>
                  </td>
                  <td>
                  <span>{user.age}</span>
                  </td>
                  <td>
                  <span>{user.nationality}</span>
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => {
                        openModal(user)
                      }}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={farTrashAlt}
                      onClick={() => {
                        handleDelete(user._id)
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {modal ? (
              <Modal
                buttonText="editar"
                onSubmit={() => {
                  handleEdit(user)
                  closeModal();
                }}
                close={() => closeModal()}
              >
                <div>
                  <legend className='text'>Formulário</legend>
                  <label className='text'>Nome:</label>
                  <input type="text" name='name' onChange={(e) => handleChange(e)} defaultValue={user.name}/><br/>
                  <label className='text'>Idade:</label>
                  <input type="number" name='age' min="1" max="99" step='1' onChange={(e) =>handleChange(e)} defaultValue={user.age}/><br/>
                  <label className='text'>Nacionalidade:</label>
                  <input type="text" name='nationality' onChange={(e) =>handleChange(e)} defaultValue={user.nationality} /><br/>
                  <br/>
                </div>
              </Modal>
            ) : null}
          </div>
          <br />
          <br />
          <br />
        <Link className="App-link" to="/about">Link to the About Page</Link>
      </header>
      
    </div>
  );
}

export default App;
