const mongoose = require("mongoose");
const URI = "mongodb://localhost/ads-test"; // testing server
mongoose.connect(URI, { useNewUrlParser: true });
const { store, show , destroy } = require("../controllers/ad.controller");
const Ad = require("../models/ad");
const asyncForEach = require("../helpers/helperFunction");
const  axios =require ('axios')
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

test("shows all the ads", async () => {
  const mockups = [
    { title: `selling${Math.random()}water${Math.random()}`, description: "123" },
    { title: `selling${Math.random()}water${Math.random()}`, description: "123"  }
  ];

  const mAd1=new Ad(mockups[0])
  await mAd1.save()
  const mAd2=new Ad(mockups[1])
  await mAd2.save()

// const saveAll=async ()=>{
//     await asyncForEach(mockups, async ad => {
//       const newAd =  new Ad(ad);
//       await newAd.save();
//   });

// }
// saveAll()
    

  const {ads} = await show();
  let actual=true; 
   ads.forEach((ad,i) => {
      if(ad.title!==mockups[i].title){
          actual= false
      }
  });
  const expected=true;
  expect(expected).toBe(actual);
});

//testing Store

test("if stores an ad successfully", async () => {
  const newAd = new Ad({ title: "selling something", description: "123" });
  await store(newAd);
  const expected = 1;
  const actual = await Ad.where({ _id: newAd["_id"] }).countDocuments();
  expect(expected).toEqual(actual);
});

test("if store fails when title is longer than 50 ", async () => {
  const newAd = new Ad({
    title: "012345678910123456789101234567891012345678910123456",
    description: "123"
  });
  await store(newAd);
  const expected = 0;
  const actual = await Ad.where({ _id: newAd["_id"] }).countDocuments();
  expect(expected).toEqual(actual);
});

test("if store fails when title and description are the same ", async () => {
  const newAd = new Ad({ title: "same", description: "same" });
  await store(newAd);
  const expected = 0;
  const actual = await Ad.where({ _id: newAd["_id"] }).countDocuments();
  expect(expected).toEqual(actual);
});

test("if an ad is destroyed succesfully ", async () => {
  const newAd = new Ad({ title: "not50", description: "notsame" });
  const id=newAd["_id"];
  const expected = 0;
  await store(newAd);
  await destroy(id);
  const actual = await Ad.where({ _id: newAd["_id"] }).countDocuments();
  expect(expected).toEqual(actual);
});

// endpoints
 test("if a new Ad is created successfully",async ()=>{
      const newAd={title:"hello world",description:"asd"}
     const ad=Ad(newAd);
     expect(ad.title).toEqual(newAd.title)
})