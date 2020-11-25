const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  name: String,
});

const Skill = new mongoose.model("Skill", SkillSchema);

module.exports = Skill;
