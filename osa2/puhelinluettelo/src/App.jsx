import { useState } from 'react'
const Person = ({person}) => 
  <div>{person.name} {person.number}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
     number: '040 1231244'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

      <div>
        Filter shown with <input value={filter} onChange={handleFilter}/>
      </div>
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
      <h2>Numbers</h2>
      <div>
        {showFilttered.map((person) => (
        <Person key={person.name} person={person} />
        ))}
      </div>
    </div>
    
  )

}

export default App