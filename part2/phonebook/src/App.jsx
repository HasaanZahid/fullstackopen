import { useState } from 'react'
import { useEffect } from 'react'
import personService from './services/persons.js'
import Notification from './components/Notification.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonFrom.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [pattern, setNewPattern] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setType] = useState('')

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
          setType('change')
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
    setType('change')
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
    .catch(error => {
      setType('error')
      setMessage(`Information of ${newName} 
        has already been removed from the server`)
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
      <Notification message={message} type={messageType} /> 
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

export default App