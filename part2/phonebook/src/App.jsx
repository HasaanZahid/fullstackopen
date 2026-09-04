import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [pattern, setNewPattern] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))
  }, []
  )
  const addPersons = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === personObject.name)){
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewPattern = (event) => {
    setNewPattern(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter pattern={pattern} onChange={handleNewPattern} />
      
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPersons} 
      nameVal={newName} numVal={newNumber} 
      nameChange={handleNewName} numChange={handleNewNumber} />

      <h3>Numbers</h3>
      <Persons persons={persons} pattern={pattern} />

    </div>
  )
}

const Filter = ({pattern, onChange}) => {
  return (
    <div>
    filter shown with <input value={pattern} onChange={onChange}/>
    </div>
  )
}

const PersonForm = ({onSubmit, nameVal, numVal, nameChange, numChange}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameVal} onChange={nameChange} />
      </div>
      <div>
        number: <input value={numVal} onChange={numChange} /> 
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, pattern}) => {
  return(
    <ul>
      {persons
      .filter(person => person.name.toLowerCase().includes(pattern.toLowerCase()))
      .map(person => <li key={person.name}>{person.name} {person.number}</li>)
      }
    </ul>
  )
}

export default App