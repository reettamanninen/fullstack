const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blogi = require('../models/blogi')

const assert = require('node:assert')

const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

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

const blogitInDb = async () => {
  const blogit = await Blogi.find({})
  return blogit.map(blogi => blogi.toJSON())
}

module.exports = {
  blogit, blogitInDb
}

describe('blog api testit', { concurrency: false}, () => {
let token

beforeEach(async () => {
    await Blogi.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sdfdsf', 10)
    const user = new User ({
      username: 'perti',
      name: 'matti mattinen',
      passwordHash
    })

  await user.save()

  const login = await api
    .post('/api/login')
    .send({
      username: 'perti',
      password: 'sdfdsf'
    })

    token = login.body.token
  
    let blogiObject = new Blogi({
      ...blogit[0],
      user: user._id})
    await blogiObject.save()
    blogiObject = new Blogi({
      ...blogit[1],
      user: user._id})
    await blogiObject.save()
    blogiObject = new Blogi({
      ...blogit[2],
      user: user._id})
    await blogiObject.save()

})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogit')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a valid blog can be added ', async () => {
    const newBlogi = {
    
      title: 'fseg',
      author: 'sdnslkdfg',
      url: 'dkjsnkvgewf',
      likes: 1
    }
  
    await api
      .post('/api/blogit')
      .set ('Authorization', `Bearer ${token}`)
      .send(newBlogi)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogit')
  
    const titles = response.body.map(r => r.title)
    assert.strictEqual(response.body.length, blogit.length + 1)
    assert(titles.includes('fseg'))

    const authors = response.body.map(r => r.author)
    assert.strictEqual(response.body.length, blogit.length + 1)
    assert(authors.includes('sdnslkdfg'))

    const urls = response.body.map(r => r.url)
    assert.strictEqual(response.body.length, blogit.length + 1)
    assert(urls.includes('dkjsnkvgewf'))

    const likess = response.body.map(r => r.likes)
    assert.strictEqual(response.body.length, blogit.length + 1)
    assert(likess.includes(1))
  })

  test('blog without likes is not added', async () => {
    const newBlogi = {
      title: 'ewfwe',
      author: 'dfwenkg',
      url: 'fwskegjwbek'
   }
  
    const add = await api
      .post('/api/blogit')
      .set ('Authorization', `Bearer ${token}`)
      .send(newBlogi)
      .expect(201)
  
     
    assert.strictEqual(add.body.likes, 0)
  })

  test('blog without title or url get badrequest', async () => {
    const newBlogi = {
      author: 'dfwenkg',
      likes: 3
   }
    await api
      .post('/api/blogit')
      .set ('Authorization', `Bearer ${token}`)
      .send(newBlogi)
      .expect(400)
  })

test('oikea määrä', async () => {
    await api
        .get('/api/blogit')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogit')

        assert.strictEqual(response.body.length, blogit.length)
})



  test('id identifioi', async () => {
    const response = await api.get('/api/blogit')
    const blogit = response.body

    blogit.forEach(blogi => {
        assert.ok(blogi.id)
        assert.strictEqual(blogi._id, undefined)
    })
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await blogitInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogit/${blogToDelete.id}`)
      .set ('Authorization', `Bearer ${token}`)
      .expect(204)
  
    const blogsAtEnd = await blogitInDb()
  
    const ids = blogsAtEnd.map(n => n.id)
    assert(!ids.includes(blogToDelete.id))
  
    assert.strictEqual(blogsAtEnd.length, blogit.length - 1)
  })

  test('a blog can be edited', async () => {
    const blogsAtStart = await blogitInDb()
    const blogToEdit = blogsAtStart[0]
  
    const updatedBlog = {
        likes: blogToEdit.likes + 1
    }

    await api
      .put(`/api/blogit/${blogToEdit.id}`)
      .send(updatedBlog)
      .expect(200)
  
    const blogsAtEnd = await blogitInDb()
  
    const edit = blogsAtEnd.find(r => r.id === blogToEdit.id)  
    assert.strictEqual(edit.likes, blogToEdit.likes + 1)
  })

  after(async () => {
    await mongoose.connection.close()
  })

})
