const express = require("express");
const router = express.Router();

const Skill = require("../models/Skill");

router.get("/", async (req, res) => {
  try {
    const data = await Skill.find({}).lean();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
  }
});

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
