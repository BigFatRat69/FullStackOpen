const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

let persons = [
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
  ]


  app.use(morgan('tiny'));
  app.use(express.json())
  app.use(cors())


  const generateId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.get('/info', (request, response) => {
    const responseContent1 = `Phonebook has info for ${persons.length} people`;
    const responseContent2 = `Current time is: ${new Date().toString()}`;
    response.send(`<p>${responseContent1}</p><p>${responseContent2}</p>`);
  });

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const { name, number } = request.body;
  
    if (!name || !number) {
      return response.status(400).json({ error: 'Name or number is missing' });
    }
    if (persons.some(person => person.name === name)) {
      return response.status(400).json({ error: 'Name must be unique' });
    }
    const newPerson = {
      id: generateId(),
      name,
      number,
    };
  
    persons.push(newPerson);
    console.log("Person was added:", newPerson);
    response.json(newPerson);
  });

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)