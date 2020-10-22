const express = require('express')
const router = express.Router()

const Client = require('../models/Client')

// @desc Current Test Route
// @route GET /client
router.get('/', (req, res) => {
    res.send('Client Route')
})

// @desc Get List of Providing Employers for Applicant Form
// @route GET /client/providers
router.get('/providers', async (req, res) => {
    try {
        const data = await Client.find({ providingapplicants: true }, 'name').lean()
        res.status(200).send(data)
    } catch (error) {
        console.error(error)
    }

})

// @desc Add client(s) to db
// @route POST /client
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        await Client.create(req.body)
        res.status(200).send('Client Added')
    } catch (error) {
        console.error(error)
    }
})

module.exports = router