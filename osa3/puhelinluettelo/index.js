const express = require('express')
const { request, response } = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())


app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request) =>{
  return JSON.stringify(request.body)
}
)

app.use(morgan('tiny'))
app.use(morgan((tokens, request, response) => {
  return tokens.body(request, response)
}))


app.get('/info', (request, response, next) => {
    const count = persons.length
    const time = new Date()
    response.send(`<p> Phonebook has info for ${count} people </p>
    <p> ${time} </p>`)}
)

app.get('/api/persons',(request, response, next) => {
Person.find({}).then(persons => {
  response.json(persons)
  }) 
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(person => {
        if (person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
    response.status(204).end()
  })
  .catch(error => next(error))
  })

  

  app.post('/api/persons', (request, response, next) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ error: 'name or number missing' })
    }
  
    const person = new Person ({
      name: body.name,
      number: body.number
  })

  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
  })

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }

    return response.status(500).json({error: 'jottain on pielessä :('})
  
    next(error)
  }
  
  
  app.use(errorHandler)

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })