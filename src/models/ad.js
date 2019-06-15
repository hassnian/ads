const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  publicationDate: { type: Date, required: true, default: Date.now }
});

AdSchema.methods.validations = function validations() {
  const errors = {};
  if (this.checkIfAtrIsUndefined("title")) {
    errors.title = "title is undifined";
    return { hasErrors: true, errors };
  }
  if (this.checkIfAtrIsUndefined("description")) {
    errors.description = "description is undifined";
    return { hasErrors: true, errors };
  }
  if (this.checkIfTitleAndDescriptionAreTheSame()) {
    errors.titleSameAsDesc = true;
  }
  if (this.checkIfTitleIsBiggerThan50()) {
    errors.titleIsBiggerThan50 = true;
  }
  // checks if there is any errors
  const values = Object.values(errors);
  for (let error of values) {
    if (error) {
      return { hasErrors: true, errors };
    }
  }
  return { hasErrors: false };
};

AdSchema.methods.checkIfAtrIsUndefined = function checkIfAtrIsUndefined(Atr) {
  return !this[Atr];
}

AdSchema.methods.checkIfAnAdExists=async function  checkIfAnAdExists() {
  const count = await mongoose.model("Ad", AdSchema).where({ _id: this._id }).countDocuments();
  if (count === 0) {
    return false;
  }
  return true
}

AdSchema.methods.checkIfTitleAndDescriptionAreTheSame = function checkIfTitleAndDescriptionAreTheSame() {
  if (this.title == this.description) {
    return true;
  }
  return false;
};
AdSchema.methods.checkIfTitleIsBiggerThan50 = function checkIfTitleIsBiggerThan50() {
  if (this.title.length > 50) {
    return true;
  }
  return false;
};

module.exports = mongoose.model("Ad", AdSchema);
