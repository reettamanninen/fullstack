
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://retumanninen_db_user:${password}@cluster0.dfxvqbm.mongodb.net/peopleApp?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Pena',
  number: '040123456'
})

// jos annetaan nimi ja numero -> lisätään nimi/numero
if (name && number) {
    const person = new Person({name, number})


person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} //jos vain salasan -> tulostaa listan
else if (!name && !number) {
    Person.find({})
        .then(persons => {
            console.log('phonebook:')
            persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
    
}

