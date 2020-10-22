const express = require('express')
const router = express.Router()

const Applicant = require('../models/Applicant')

// @desc Get All Applicants
// @route GET /applicant
router.get('/', async (req, res) => {
    try {
        const data = await Applicant.find()
        .populate('employer', 'name')

        console.log(data)
        res.status(200).send()


    } catch (error) {
        console.error(error)
    }
})


// @desc Add applicant(s) to db
// @route POST /applicant
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