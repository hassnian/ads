const mongoose = require("mongoose");
const URI = "mongodb://localhost/ads-test"; // testing server
mongoose.connect(URI, { useNewUrlParser: true });
const { store, index , destroy } = require("../controllers/ad.controller");
const Ad = require("../models/ad");
const {getValidAds}=require('../factories/ad.factories')


//to make sure that there are not false positives
test("ads test", () => {
  beforeEach(async () => {
    await Ad.deleteMany({});
  });

  afterEach(async () => {
    await Ad.deleteMany({});
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
});

test("if a new Ad is created successfully",async ()=>{
  const newAd={title:"hello world",description:"newAd"}
   const ad=Ad(newAd);
   expect(ad.title).toEqual(newAd.title)
})

test("if checkIfAtrIsUndefined() returns true when the asked atribute is undefined", async () => {
  const newAd = new Ad({  description: "example" });
  const actual=newAd.checkIfAtrIsUndefined("title");
  const expected = true;
  expect(actual).toBe(expected);
});

test("if checkIfAtrIsUndefined() returns falsy when the asked atribute is defined", async () => {
  const newAd = new Ad({  title: "example" });
  const actual=newAd.checkIfAtrIsUndefined("title");
  const expected = false;
  expect(actual).toBe(expected);
});

test("if checkIfTitleIsBiggerThan50() returns true when title is bigger than 50", async () => {
  const newAd = new Ad({  title: "012345678910123456789101234567891012345678910123456" });
  const actual=newAd.checkIfTitleIsBiggerThan50();
  const expected = true;
  expect(actual).toBe(expected);
});
test("if checkIfTitleIsBiggerThan50() returns false when title is NOT bigger than 50", async () => {
  const newAd = new Ad({  title: "notBiggerThan50" });
  const actual=newAd.checkIfTitleIsBiggerThan50();
  const expected = false;
  expect(actual).toBe(expected);  
});

test("if checkIfTitleAndDescriptionAreTheSame() returns true when title and description are the same", async () => {
  const newAd = new Ad({  title: "same", description: "same" });
  const actual=newAd.checkIfTitleAndDescriptionAreTheSame();
  const expected = true;
  expect(actual).toBe(expected);
});
test("if checkIfTitleAndDescriptionAreTheSame() returns falsy when title and description are NOT the same", async () => {
  const newAd = new Ad({  title: "not", description: "same"});
  const actual=newAd.checkIfTitleAndDescriptionAreTheSame();
  const expected = false;
  expect(actual).toBe(expected);
});

// test checkIfAdExistsById

test("if checkIfAdExistsById() returns false when ad is not founded", async () => {
  const newAd = new Ad({  title: "not", description: "same"});
  const actual=await newAd.checkIfAnAdExists();
  const expected = false;
  expect(actual).toBe(expected);
});

test("if checkIfAdExistsById() returns true when ad is found", async () => {
  const newAd = new Ad({  title: "not", description: "same"});
  await store(newAd);
  const actual=await newAd.checkIfAnAdExists();
  const expected = true;
  expect(actual).toBe(expected);
});

// testing index

test("shows all the ads", async () => {
  const response = await getValidAds(10)
  const mockups = response.ads
  let actual=true; 

  for(let i=0;i<mockups.length;i++){
    const mAd= new Ad(mockups[i]);
    await mAd.save();
  }

  const {ads} = await index();
  ads.forEach((ad,i) => {
    console.log(ad.title!==mockups[i].title)
    if(ad.title!==mockups[i].title){
          actual= false
      }
  });
  const expected=true;
  expect(actual).toBe(expected);  
});

//testing Store

test("if stores an ad successfully", async () => {
  const newAd = new Ad({ title: "selling something", description: "123" });
  await store(newAd);
  const expected = true;
  const actual=await newAd.checkIfAnAdExists(); 
  expect(actual).toBe(expected);
});

test("if stores fails when title is not passed", async () => {
  const newAd = new Ad({  description: "123" });
  const response=await store(newAd);  
  const expected = false;
  const actual=await newAd.checkIfAnAdExists(); 
  expect(actual).toBe(expected);
});

test("if stores fails when description is not passed", async () => {
  const newAd = new Ad({  title: "123" });
  const response=await store(newAd);  
  const expected = false;
  const actual=await newAd.checkIfAnAdExists(); 
  expect(actual).toBe(expected);
});

test("if stores fails when title and description are not passed", async () => {
  const newAd = new Ad({});
  const response=await store(newAd);  
  const expected = false;
  const actual=await newAd.checkIfAnAdExists();
  expect(actual).toBe(expected);
});

test("if store fails when title is longer than 50 ", async () => {
  const newAd = new Ad({
    title: "|xxxxxxxxx|xxxxxxxxx|xxxxxxxxx|xxxxxxxxx|xxxxxxxxx|",
    description: ""
  });
  await store(newAd);
  const expected = false;
  const actual=await newAd.checkIfAnAdExists();
  expect(actual).toBe(expected);
});

test("if store fails when title and description are the same ", async () => {
  const newAd = new Ad({ title: "same", description: "same" });
  await store(newAd);
  const expected = false;
  const actual=await newAd.checkIfAnAdExists();
  expect(actual).toBe(expected);
});

test("if an ad is destroyed succesfully  ", async () => {
  const newValid=await getValidAds()
  console.log(newValid);
  const newAd = new Ad(newValid);
  const expected = false;
  await store(newAd);
  await destroy(newAd);
  const actual=await newAd.checkIfAnAdExists();
  expect(actual).toBe(expected);
});
test("if destroy() returns false when the id is invalid ", async () => {
  const newAd = new Ad({ title: "not50", description: "notsame" });
  const expected = false;
  await store(newAd);
  await destroy(newAd);
  const actual=await newAd.checkIfAnAdExists();
  expect(actual).toBe(expected);
});


test("facories",async()=>{
  const response=await getValidAds(3)

})

 