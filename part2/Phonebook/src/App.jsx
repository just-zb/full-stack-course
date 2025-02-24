import { useState,useEffect } from 'react'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import Persons from './components/persons'
import personService from './services/persons'
import Fronter from './components/fronter'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService.getAll().then(initialPersons => {setPersons(initialPersons)})
  }
  , [])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const addPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    }
    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
    })
    console.log("person added",personObject)
  }
  const updatePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const changedPerson = { ...person, number: newNumber }
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService.update(id, changedPerson).then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
    }
  }
  const handlePersonLogic = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)
    if (person) {
      updatePerson(person.id)
      setMessage(`Updated ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000
      )
    } else {
      addPerson()
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000
      )
    }
    setNewName('')
    setNewNumber('')
  }
  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(id).then((response) => {
        setPersons(persons.filter(person => person.id !== id))
      }).catch(error => {
        console.log(error);
        setMessage(`Error: ${person.name} was already removed from the server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  } 
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Fronter message={message}/>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm name={newName} number={newNumber} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} handlePersonLogic={handlePersonLogic} />
      <h2>Numbers</h2>
      <Persons persons={persons} personFilter={personFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App