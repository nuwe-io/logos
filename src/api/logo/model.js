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
    rank: { type: Number, default: 0 },
    rankHistory: [
      {
        value: { type: Number },
        date: { type: Date }
      }
    ],
    fileKey: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const Logo = mongoose.model('Logo', logoSchema)
module.exports = Logo
