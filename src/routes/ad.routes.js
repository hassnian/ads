const express = require("express");
const router = express.Router();
const { store, index,destroy } = require("../controllers/ad.controller");
const Ad =require('../models/ad')

router.get("/", async (req, res) => {
  const response = await index();
  res.json({ ...response });
});

// router.get('/:id') //show a single ad on SPRINT 3

router.post("/", async (req, res) => {
  const {title,description}=req.body
  const newAd = new Ad({ title,description });
  const response = await store(newAd);
  res.json({ ...response });
});

// router.post('/fav/:id') //fav a post? SPRINT 3
// router.delete('/expire/:date') // sprint 2

router.delete('/:id', async (req,res)=>{
  const {id}=req.params;
  const newAd=new Ad({"_id":id})
  const response=await destroy(newAd);
  res.json({response})
})

module.exports = router;
