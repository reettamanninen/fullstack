const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blogi = require('../models/blogi')

const assert = require('node:assert')
const api = supertest(app)

const blogit = [
    
    {
       _id: '507f1f77bcf86cd799439011',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 3,
        __v: 0
      },
      {
        _id: '507f1f77bcf86cd799439012',
        title: 'Go To ',
        author: 'Edsger',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
      _id: '507f1f77bcf86cd799439013',
        title: 'Go To ',
        author: 'Edsger',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
        __v: 0
      }

]

beforeEach(async () => {
    await Blogi.deleteMany({})
    let blogiObject = new Blogi(blogit[0])
    await blogiObject.save()
    blogiObject = new Blogi(blogit[1])
    await blogiObject.save()
    blogiObject = new Blogi(blogit[2])
    await blogiObject.save()
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogit')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})

test('oikea määrä', async () => {
    await api
        .get('/api/blogit')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogit')

        assert.strictEqual(response.body.length, blogit.length)
})

const blogitInDb = async () => {
    const blogit = await Blogi.find({})
    return blogit.map(blogi => blogi.toJSON())
  }
  
  module.exports = {
    blogit, blogitInDb
  }

  test('id identifioi', async () => {
    const response = await api.get('/api/blogit')
    const blogit = response.body

    blogit.forEach(blogi => {
        assert.ok(blogi.id)
        assert.strictEqual(blogi._id, undefined)
    })
  })