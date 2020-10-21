const express = require('express')
const router = express.Router()

const Applicant = require('../models/Applicant')

// @desc Current Test Route
// @route GET /client
router.get('/', (req, res) => {
    res.send('Applicant Route')
})


// @desc Add applicant(s) to db
// @route POST /client
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        await Applicant.create(req.body)
        res.status(200).send()
    } catch (error) {
        console.error(error)
    }
})

module.exports = router