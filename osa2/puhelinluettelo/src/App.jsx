import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

// yksittäinen henkilö
const Person = ({person, handleDeletePerson}) => 
  <div>{person.name} {person.number}
    <button onClick={() => handleDeletePerson(person.id, person.name)}> 
      delete
    </button>
  </div>

  // henkilöt lista
  const Persons = ({persons, handleDeletePerson}) => (
    <div>
      {persons.map((person) => (
        <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson}/>
        ))}
    </div>
  )

  //hakukenttä
  const Filter = ({filter, handleFilter}) => (
    <div>
      Filter shown with <input value={filter} onChange={handleFilter}/>
    </div>
  )

  // uuden henkilön lisääminen
  const Form = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => (
    <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName} 
          onChange={handleNameChange} 
          />
        </div>
        <div>
          number: <input 
          value={newNumber} 
         onChange={handleNumberChange} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [okMessage, setOkMessage] = useState(null)

  // Haetaan henkilöt palvelimelta
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event)=> {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: String (persons.length + 1)
    }
   
     personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setOkMessage(`Added ${response.data.name}`)
        setTimeout(()=> setOkMessage(null), 1000)
        setNewName('')
        setNewNumber('')
      })
      return
  }

  const showFilttered = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
    )

  const handleNameChange = (event) => 
  { console.log(event.target.value) 
    setNewName(event.target.value) }

  const handleNumberChange = (event) => 
  { console.log(event.target.value) 
    setNewNumber(event.target.value) }

    const handleFilter = (event) => 
  { console.log(event.target.value) 
    setFilter(event.target.value) }

    //Henkilön poistaminen
  const deletePerson = (id, name) => {
    if (window.confirm(`Do you want to delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setOkMessage(`Deleted ${name}`)
          setTimeout(()=> setOkMessage(null), 1000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={okMessage} />
        <Filter filter={filter} handleFilter={handleFilter} />
      <h3>add a new</h3>
        <Form addPerson={addPerson} newName={newName}
        newNumber={newNumber} handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
        <Persons persons={showFilttered} 
        handleDeletePerson={deletePerson}/>
    </div>
    
  )

}

export default App