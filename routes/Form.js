const express = require('express')
const {body,validationResult} = require('express-validator')
var types = require('pg').types

const router = express.Router();

const db = require('./../db')

router.post('/',[body('name').not().isEmpty(),body('email').not().isEmpty().isEmail(),body('reg_num').not().isEmpty(),body('dept').not().isEmpty(),body('cgpa').not().isString().isEmpty(),body('ten_mark').not().isEmpty(),body('ten_board').not().isEmpty(),body('twelve_mark').not().isEmpty(),body('twelve_board').not().isEmpty()],async(req,res)=>{
    try {
        String.prototype.float = function() { 
            return parseFloat(this.replace(',', '.')); 
          }
        const name = req.body.name;
        const email = req.body.email;
        const reg_num = req.body.reg_num;
        const dept = parseInt(req.body.dept);
        const cgpa = parseFloat(req.body.cgpa)
        const ten_mark = req.body.ten_mark;
        const ten_board = req.body.ten_board;
        const twelve_mark = req.body.twelve_mark;
        const twelve_board = req.body.twelve_board;
        const res1 = await db.query('INSERT INTO Students(RegNumber,name,email,fk_dept,cgpa,twelve_mark,twelve_board,ten_mark,ten_board) values($1,$2,$3,$4,$5,$6,$7,$8,$9)',[reg_num,name,email,dept,cgpa,twelve_mark,twelve_board,ten_mark,ten_board])
        res.send(res1)
        // const response = await db.query('INSERT INTO Students values($1,$2,$3,$4,$5)',[reg_num,name,email,dept,])
    } catch (error) {
        console.log(error)
    }

})
router.put('/',async(req,res)=>{
    try {
        String.prototype.float = function() { 
            return parseFloat(this.replace(',', '.')); 
          }
        const name = req.body.name;
        const email = req.body.email;
        const reg_num = req.body.reg_num;
        const dept = parseInt(req.body.dept);
        const cgpa = parseFloat(req.body.cgpa)
        const ten_mark = req.body.ten_mark;
        const ten_board = req.body.ten_board;
        const twelve_mark = req.body.twelve_mark;
        const twelve_board = req.body.twelve_board;
        const res1 = await db.query('UPDATE Students SET name=$1,email=$2,fk_dept=$3,cgpa=$4,twelve_mark=$5,twelve_board=$6,ten_mark=$7,ten_board=$8 WHERE RegNumber=$9',[name,email,dept,cgpa,twelve_mark,twelve_board,ten_mark,ten_board,reg_num])
        res.send(res1)
        // const response = await db.query('INSERT INTO Students values($1,$2,$3,$4,$5)',[reg_num,name,email,dept,])
    } catch (error) {
        console.log(error)
    }
})

router.get('/:login_id',async(req,res)=>{
    try{
        const id = req.params.login_id;
        const response = await db.query("SELECT * FROM Students WHERE regNumber=$1",[id]);
        res.send(response.rows[0])
    }catch(err){
        console.log(err)
    }
})

module.exports = router;