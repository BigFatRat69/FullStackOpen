import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: "0421231234" }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    if (!persons.some(person => person.name === newName)) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      };
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }
  };



  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
