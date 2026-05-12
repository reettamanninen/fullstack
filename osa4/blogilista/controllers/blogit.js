const blogitRouter = require('express').Router()
const Blogi = require('../models/blogi')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogitRouter.get('/', async (request, response) => {
  const blogit = await Blogi
    .find({})
    .populate('user', {
      username: 1,
      name: 1
    })

  response.json(blogit)
})



blogitRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }

  const blogi = new Blogi({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlogi = await blogi.save()

  user.blogit = user.blogit.concat(savedBlogi._id)
  await user.save()

  response.status(201).json(savedBlogi)
})

blogitRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  
  const user = request.user
if (!user) {
  return response.status(401).json({ error: 'token invalid'})
}

    const blogi = await Blogi.findById(request.params.id)

    if (!blogi) {
      return response.status(404).json({ error: 'blog missing' })
    }
    if (blogi.user.toString() !== decodedToken.id.toString()) {
      return response.status(401).json({error: 'unauthorized'})
    }
    await Blogi.findByIdAndDelete(request.params.id)
   
    response.status(204).end()
  })

  blogitRouter.put('/:id', (request, response, next) => {
    const { likes } = request.body
  
    Blogi.findById(request.params.id)
      .then(blogi => {
        if (!blogi) {
          return response.status(404).end()
        }
  
        blogi.likes = likes
  
        return blogi.save().then((result) => {
          response.status(200).json(result)
        })
      })
      .catch(error => next(error))
  })

module.exports = blogitRouter