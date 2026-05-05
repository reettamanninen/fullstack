const blogitRouter = require('express').Router()
const Blogi = require('../models/blogi')

blogitRouter.get('/', (request, response) =>
    Blogi.find({}).then(blogit => response.json(blogit))
)

blogitRouter.post('/', (request, response) => {
    const blogi = new Blogi(request.body)
    blogi.save().then(result => {
        response.status(201).json(result)
    }
        )
}
)

module.exports = blogitRouter