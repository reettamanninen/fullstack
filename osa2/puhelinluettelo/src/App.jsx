import { useState, useEffect } from 'react'
import axios from 'axios'


// yksittäinen henkilö
const Person = ({person}) => 
  <div>{person.name} {person.number}</div>

  // henkilöt lista
  const Persons = ({persons}) => (
    <div>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
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

  // Haetaan henkilöt palvelimelta
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
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
      id: String(persons.length + 1)
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        console.log(response)
      })
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

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} handleFilter={handleFilter} />
      <h3>add a new</h3>
        <Form addPerson={addPerson} newName={newName}
        newNumber={newNumber} handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
        <Persons persons={showFilttered} />
    </div>
    
  )

}

export default App