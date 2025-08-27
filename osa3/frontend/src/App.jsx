import { useState, useEffect } from 'react';
import personService from './services/persons.js';
import './App.css';

const Notification = ({ message, messageType}) => {
  if (message === null) {
    return null
  }

  if (messageType === "Negative") {
    return (
      <div className="error">
        {message}
      </div>
    )
  } else {
    return (
      <div className="Positive">
        {message}
      </div>
    )
  }
}

const Filter = ({ filter, handleSearchChange }) => (
  <div>
    Filter shown with <input value={filter} onChange={handleSearchChange} />
  </div>
);

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ personsToShow, handleDelete }) => (
  <ul>
    {personsToShow.map(person => (
      <li key={person._id}>
        {person.name} {person.number}{' '}
        <button onClick={() => handleDelete(person)}>Delete</button>
      </li>
    ))}
  </ul>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null)
  const [messageType, setMessageType] = useState("Negative")

  const handleDelete = (person) => {
  if (window.confirm(`Delete ${person.name}?`)) {
    personService
      .deletePerson(person._id)
      .then(() => {
        setPersons(persons.filter(p => p._id !== person._id));
        setMessageType("Negative");
        setNotification(`Person ${person.name} was deleted`);
        setTimeout(() => setNotification(null), 5000);
      })
      .catch(error => {
        setMessageType("Negative");
        setNotification(`Person ${person.name} was already deleted from the server`);
        setTimeout(() => setNotification(null), 5000);

        setPersons(persons.filter(p => p._id !== person._id));
      });
  }
};

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.log('Fetched persons:', response.data);
        setPersons(response.data);
      })
  }, []);

  const personsToShow = filter
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;
    const addPerson = event => {
      event.preventDefault();
      const existingPerson = persons.find(person => person.name === newName);
  
      if (existingPerson) {
        if (window.confirm(`${newName} is already in the phonebook, do you want to update the number?`)) {
          const updatedPerson = { ...existingPerson, number: newNumber };
          personService.update(existingPerson._id, updatedPerson).then(updatedPerson => {
          setPersons(persons.map(person => 
          person._id !== existingPerson._id ? person : updatedPerson
        ));
          setNewName('');
          setNewNumber('');
          setMessageType("Positive");
          setNotification(`Person ${newName} was updated`);
          setTimeout(() => setNotification(null), 5000);
        });

        }
      } else {
        const personObject = { name: newName, number: newNumber };
        personService.create(personObject).then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
          setMessageType("Positive")
          setNotification(`Person ${newName} was added`);
          setTimeout(() => setNotification(null), 5000);
        })
        .catch(error => {
          setNotification(error.response.data.error)
          console.log(error.response.data)
        });
      };
    };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={notification} messageType={messageType}/>
          <Filter filter={filter} handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  );
};

export default App;
//npx json-server --port=3001 --watch db.json
