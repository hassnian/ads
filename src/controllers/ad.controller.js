const Ad = require("../models/ad");


module.exports =class AdClass  {
  static async index() {
    const ads = await Ad.find();
    return { Successfull:true, ads: ads };
  }

  static async store(newAd) {
    const validationResponse = newAd.validations();
    if (validationResponse.hasErrors) {
      return { Successfull: false, errors: validationResponse.errors };
    }
    await newAd.save();
    return { Successfull: true, newAd };
  }

  static async destroy(ad) {
    const response =await ad.checkIfAnAdExists();
    if(!response){
      return {Succesfull:false}
    }
    await Ad.deleteOne({ _id: ad["_id"] });
    return { Succesfull: true };
  }
  
};
