const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  publicationDate:{ type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("Ad", AdSchema);
