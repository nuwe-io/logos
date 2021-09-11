const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logoSchema = new Schema(
  {
    name: { type: String, required: true },
    shortname: { type: String, required: true },
    url: { type: String, required: true },
    mainCategory: { type: String, required: true },
    categoryList: { type: [String], required: true },
    files: { type: [String], required: true },
    fileKey: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const Logo = mongoose.model('Logo', logoSchema)
module.exports = Logo
