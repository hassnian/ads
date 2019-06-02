const Ad = require("../models/ad");

const AdClass = {};
module.exports = AdClass.class = class {
  static async show() {
    const ads = await Ad.find();
    console.log("Showing all Ads");
    console.log(ads);
    return { Status: "Succesfull", ads: ads };
  }
  static async store(newAd) {
    console.log("Storing an Ad ...");
    const { title, description } = newAd;
    //checks if its a good ad
    if (title.length > 50 || title == description) { //TODO:move the if statement the function should only do one thing , possible solution make another function 
      const biggerThan50 = title.length > 50;
      const titleSameAsDesc = title == description;
      console.log("***Inavalid Ad***");
      console.log(`Bigger than 50: ${title.length > 50}`);
      console.log(`Title the same as description: ${title == description}`);
      return {
        status: "INVALID AD",
        errors: { biggerThan50, titleSameAsDesc }
      };
    }

    await newAd.save();
    console.log(newAd);
    return { status: "Successfully added", newAd };
  }
};
