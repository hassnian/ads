const express = require("express");
const router = express.Router();
const { store, show,destroy } = require("../controllers/ad.controller");
const Ad =require('../models/ad')
router.get("/", async (req, res) => {
  const response = await show();
  res.json({ ...response });
});
// req.params.id
// router.get('/:id') //show a single onw SPRINT 3

router.post("/", async (req, res) => {
  const {title,description}=req.body
  const newAd = new Ad({ title,description });
  const response = await store(newAd);
  res.json({ ...response });
});
// router.put('/:id') //Like a post? SPRINT 3
// router.delete('/:id') SPRINT 1
router.delete('/:id', async (req,res)=>{
  const {id}=req.params;
  const response=await destroy(id);
  return response
})

module.exports = router;
