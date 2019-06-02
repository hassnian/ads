const express = require('express');
const router = express.Router();
const {store,show} = require('../controllers/ad.controller')

router.get("/", (req,res) => {
    show()
    res.json({Status:"API WORKED"})
    
})
router.post("/", (req,res) => {
    store();
    res.json({Status:"API POST WORKED"})
    
    
})


module.exports = router;