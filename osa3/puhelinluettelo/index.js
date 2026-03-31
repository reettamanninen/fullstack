const http = require('http')

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
      },
      {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
      },
      {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122'
      }
]
const app = http.createServer((request, response) => {
    if (request.url === '/api/persons'){
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(persons))
    }
  else if (request.url === '/info'){
    const count = persons.length
    const time = new Date()
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(`
    <p> Phonebook has info for ${count} people </p>
    <p> ${time} </p>
    `)
    }
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)