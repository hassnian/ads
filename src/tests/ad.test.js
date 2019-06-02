const mongoose = require("mongoose");
const URI = "mongodb://localhost/ads-test"; // put your url connection here
mongoose.connect(URI, { useNewUrlParser: true });
const { store, show } = require("../controllers/ad.controller");
const Ad = require("../models/ad");

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

// test("gets all ads", async () => {
//   const ads = await show();
//   console.log(ads);
//   expect(true).toBe(true);
// });

test("store an ad", async () => {
  const newAd = new Ad({ title: "selling something", description: "123" });
  await store(newAd);
  const expected = 1;
  const actual = await Ad.where({ _id: newAd["_id"] }).countDocuments();
  expect(expected).toEqual(actual);
});

test("store fails when title is longer than 50 ", async () => {
    const newAd = new Ad({ title: "012345678910123456789101234567891012345678910123456", description: "123" });
    await store(newAd);
    const expected = 0;
    const actual = await Ad.where({ _id: newAd["_id"] }).countDocuments();
    expect(expected).toEqual(actual);
  });

  test("store fails when title is longer than 50 ", async () => {
    const newAd = new Ad({ title: "same", description: "same" });
    await store(newAd);
    const expected = 0;
    const actual = await Ad.where({ _id: newAd["_id"] }).countDocuments();
    expect(expected).toEqual(actual);
  });