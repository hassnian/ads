const Ad = require("../models/ad");

const AdClass = {};
module.exports = AdClass.class = class {
  
  static async show() {
    const ads = await Ad.find();
    return { Status: "Succesfull", ads: ads };
  }
  
  static async store(newAd) {
    const { title, description } = newAd;
    //checks if its a good ad
    if (title.length > 50 || title == description) { //TODO:move the if statement the function should only do one thing , possible solution make another function 
      const biggerThan50 = title.length > 50;
      const titleSameAsDesc = title == description;
      return {
        status: "INVALID AD",
        errors: { biggerThan50, titleSameAsDesc }
      };
    }

    await newAd.save();
    console.log(newAd);
    return { status: "Successfully added", newAd };
  }

  static async destroy(id){
    await Ad.deleteOne({_id:id})
    return {Status:"Removed"}
  }
};
