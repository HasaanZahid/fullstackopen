import { useState } from 'react'
import { useEffect } from 'react'
import personService from './services/persons.js'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [pattern, setNewPattern] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(response => setPersons(response))
  }, [])

  const addPersons = (event) => {
    event.preventDefault()
    const hasName = persons.some(person => person.name === newName)
    if (hasName){
      const nameID = persons.find(person => person.name === newName).id
      if (window.confirm(`
        ${newName} is already added to the phonebook,
        replace the old number with a new one?`)){
          updatePerson(nameID, newNumber)
          setMessage(`Changed ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 4000)
          setNewName('')
          setNewNumber('')          
          return
        }
    }
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
    
    personService
    .create(personObject)
    .then(response => setPersons(persons.concat(response)))
    setMessage(`Added ${newName}`)
    setTimeout(() => {
      setMessage(null)
    },4000)
    setNewName('')
    setNewNumber('')
  }

  const updatePerson = (id, num) => {
    const person = persons.find(person => person.id === id)
    const personObject = {...person, number: num}
    personService
    .update(id, personObject)
    .then(response => 
      setPersons(persons.map(person => person.id === id ? response : person))
    )
  }

  const removePerson = (id) => {
    
    personService
    .remove(id)
    .then(response => {
      console.log(response)
      const updatedPersons = persons.filter(person => person.id !== response.id)
      setPersons(updatedPersons)
    })
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
      <Notification message={message} /> 
      <Filter pattern={pattern} onChange={handleNewPattern} />
      
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPersons} 
      nameVal={newName} numVal={newNumber} 
      nameChange={handleNewName} numChange={handleNewNumber} />



      <h3>Numbers</h3>
      <Persons persons={persons} pattern={pattern} removefunc={removePerson}/>

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

const Persons = ({persons, pattern, removefunc}) => {
  return(
    <ul>
      {persons
      .filter(person => person.name.toLowerCase().includes(pattern.toLowerCase()))
      .map(person => 
          <li key={person.id}>
            {person.name} {person.number} 
            <button key={person.id} onClick={() => {
              if (window.confirm(`Delete ${person.name} ?`)){
                removefunc(person.id)
              }
            }}>
              delete
            </button>
          </li>
          )
      }
      
    </ul>
  )
}



export default App