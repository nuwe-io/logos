const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { omitBy, isNil } = require('lodash')

/**
 * Skill categories
 */
const categories = [
  'frontend',
  'backend',
  'mobile',
  'data science',
  'cloud',
  'devops',
  'cross platform',
  'desktop',
  'gamedev',
  'systems',
  'cyber security'
]

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
    tags: {
      type: [String],
      enum: categories
    }, // Categories that can be realted to this technology
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

/**
 * Methods
 */
logoSchema.method({
  transform() {
    const transformed = {}
    const fields = ['id', 'name', 'shortname', 'url', 'fileKey']

    fields.forEach((field) => {
      transformed[field] = this[field]
    })

    return transformed
  }
})

/**
 * Statics
 */
logoSchema.statics = {
  /**
   * Get logo
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    let logo

    if (mongoose.Types.ObjectId.isValid(id)) {
      logo = await this.findById(id).exec()
    }
    if (logo) {
      return logo
    }

    throw new APIError({
      message: 'Logo does not exist',
      status: httpStatus.NOT_FOUND
    })
  },

  /**
   * List logos in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of logos to be skipped.
   * @param {number} limit - Limit number of logos to be returned.
   * @returns {Promise<User[]>}
   */
  list({ page = 1, perPage = 30, tags }) {
    const options = omitBy({ tags }, isNil)
    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec()
  }
}

const Logo = mongoose.model('Logo', logoSchema)
module.exports = Logo
