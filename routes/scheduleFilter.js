const express = require('express')
const {body,validationResult} = require('express-validator');

const router = express.Router();

const db = require('./../db')


router.get('/:id',async(req,res) => {
    try{
        const regnumber = req.params.id;
        const stuDetails = await db.query('SELECT cgpa from students WHERE regnumber=$1',[regnumber]);
        //cgpa of requested student
        const cgpa = stuDetails.rows[0].cgpa;
        const filteredCompanies = await db.query('SELECT * from schedule WHERE req_cgpa<=$1',[cgpa]);
        res.send(filteredCompanies.rows);
        
    }catch(err){
        console.log(err);
        res.send(err);
    }
    
});


module.exports = router;