const express = require('express');

const router = express.router();

router.post('/register',(req,res) => {
       res.json({message : "Register the user"});
});


router.post('/login',(req,res) => {
    res.json({message : "Login the user"});
});


router.get('/current',(req,res) => {
    res.json({message : "Show the current the user"});
});

module.exports = router;

