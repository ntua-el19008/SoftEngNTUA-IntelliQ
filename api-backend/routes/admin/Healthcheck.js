const express = require('express');
const { PrecompiledLoader } = require('nunjucks');
const router = express.Router();
const pool = require("../../db_connect");
const promisePool = pool.promise();

router
    .route("/")
    .get((req,res) => {
        pool.getConnection((err,conn) => {
        if(err){
            res.json({status :"failed", dbconnection : err.toString() });
            throw err;
        }
        else 
            res.json({status :"ok", dbconnection : "Connected" });
        conn.release();
        });
        
    })

module.exports = router;