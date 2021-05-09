const express = require("express");
const router = express.Router();

const Skill = require("../models/Skill");

// @desc Get all Skills
// @route GET /skills
router.get("/", async (req, res) => {
  try {
    const data = await Skill.find({}).lean();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
  }
});

// @desc Add skill(s) to the database - used in system setup
// @route POST /skills
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    await Skill.create(req.body);
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

module.exports = router;
