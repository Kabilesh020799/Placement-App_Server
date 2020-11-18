const express = require('express')
const {body,validationResult} = require('express-validator');

const router = express.Router();

const db = require('./../db')

router.post('/',[
         body('companyName').not().isEmpty(),body('role').not().isEmpty(),body('cgpa').not().isEmpty(),
         body('ctc').not().isEmpty(),body('isPlaced').not().isEmpty(),body('date').not().isEmpty()
        ],async(req,res)=>{
            try{
                
                const company_name = req.body.companyName;
                const role_off = req.body.role;
                const ctc_off = req.body.ctc;
                const req_cgpa = parseFloat(req.body.cgpa);
                const placed_stu = req.body.isPlaced;
                const date_alotted = req.body.date;
                const result = await db.query('INSERT INTO schedule (company_name,role_off,ctc_off,req_cgpa,placed_stu,date_alotted) values ($1,$2,$3,$4,$5,$6)',[company_name,role_off,ctc_off,req_cgpa,placed_stu,date_alotted]);
                //console.log(result);
                res.send(result);
            }
            catch(err){
                //console.log(err);
                res.send(err);
            }
        });


router.put('/',[
        body('companyName').not().isEmpty(),body('role').not().isEmpty(),body('cgpa').not().isEmpty(),
        body('ctc').not().isEmpty(),body('isPlaced').not().isEmpty(),body('date').not().isEmpty()
        ],async(req,res)=>{
            try{
                console.log(req.body);
                const company_name = req.body.companyName;
                const role_off = req.body.role;
                const ctc_off = req.body.ctc;
                const req_cgpa = parseFloat(req.body.cgpa);
                const placed_stu = req.body.isPlaced;
                const date_alotted = req.body.date;
                const result = await db.query('UPDATE schedule SET role_off=$1,ctc_off=$2,req_cgpa=$3,placed_stu=$4,date_alotted=$5 WHERE company_name=$6',[role_off,ctc_off,req_cgpa,placed_stu,date_alotted,company_name]);
                console.log(result);
                res.send(result);
            }
            catch(err){
                console.log(err);
                res.send(err);
            }
        });        

module.exports = router;