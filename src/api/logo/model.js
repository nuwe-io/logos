const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Skill categories
 */
const categories = ['frontend', 'backend', 'mobile', 'data science', 'cloud', 'devops']

const logoSchema = new Schema(
  {
    name: { type: String, required: true },
    shortname: { type: String, required: true },
    url: { type: String, required: true },
    category: {
      type: String,
      enum: categories,
      required: true
    },
    secondaryCategory: {
      type: String,
      enum: categories
    },
    otherCategories: {
      type: [String],
      enum: categories
    },
    rank: { type: Number, default: 0 }, // Valor de la skill en el momento en el que se hizo el último update
    currentRank: { type: Number, default: 0 }, // Valor de la skill actual ( teniendo en cuenta si el usuario participa o no)
    rankHistory: [
      {
        value: { type: Number },
        date: { type: Date }
      }
    ], // Solo modificarlo en IHardSkill (skillsverified)
    fileKey: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const Logo = mongoose.model('Logo', logoSchema)
module.exports = Logo
