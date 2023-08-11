const mongoose = require("mongoose")

const schema = mongoose.Schema({
	pyramidId: Number,
	name: String,
})

module.exports = mongoose.model("Pyramid", schema)

