const express = require('express');
const router = express.Router();

router
    .route("/:questionnaireID")
    .post((req,res) => {
        const qqid = req.params.questionnaireID;
        const query = `delete * from Participant WHERE QQID = '${qqid}';`;
        pool.getConnection((err,conn)=> {
            if(err){
                res.json({status:"failed", reason:"failed to connect to db"})
                return;
            }
            conn.query(query,(err,rows,fields)=>{
                if(err){
                    res.json({status:"failed",reason:err.toString()})
                    conn.release();
                    return;
                }
                res.json({status:"OK"})
                conn.release();
            })

        })

    })

    module.exports = router;