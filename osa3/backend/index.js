const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose= require('mongoose')
require('dotenv').config()
const url = process.env.MONGODB_URI



mongoose.set('strictQuery', false)
mongoose.connect(url)


app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be atleast 3 digits'],
    required: [true, 'Name is required']
  },
  number: {
    type: String,
    minlength: [8, 'Number must be atleast 8 digits'],
    validate: {
      validator: function(v) {
        return /^\d{3,4}-\d{4,}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'Phonenumber is required']
  }
})

const Person = mongoose.model('Person', personSchema)

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404)
    }
  })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.countDocuments({}).then(count => {
    const responseContent1 = `Phonebook has info for ${count} people`
    const responseContent2 = `Current time is: ${new Date().toString()}`
    response.send(`<p>${responseContent1}</p><p>${responseContent2}</p>`)
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(deletedPerson => {
    if (deletedPerson) {
      response.status(204).end()
    } else {
      response.status(404).json({ error: 'person not found' })
    }
  })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'Name or number is missing' })
  }

  Person.findOne({ name }).then(existingPerson => {
    if (!existingPerson) {
      const person = new Person({ name, number })
      person.save().then(savedPerson => {
        console.log('Person was added:', savedPerson)
        response.json(savedPerson)
      }).catch(error => {
        if (error.name === 'ValidationError') {
          return response.status(400).json({ error: error.message })
        }
        next(error)
      })
    }
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' }).then(updatedPerson => {
    if (updatedPerson) {
      response.json(updatedPerson)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)