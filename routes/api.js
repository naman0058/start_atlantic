var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool')


router.get('/get-country',(req,res)=>{
    pool.query(`select * from country`,(err,result)=>{
      if(err) throw err;
      else res.json(result)
    })
  })



  router.get('/get-gallery',(req,res)=>{
    pool.query(`select g.* , (select c.name from country c where c.id = g.countryid) as countryname from gallery g`,(err,result)=>{
      if(err) throw err;
      else res.json(result)
    })
  })


  router.get('/get-blog-category',(req,res)=>{
    pool.query(`select * from blog_category`,(err,result)=>{
      if(err) throw err;
      else res.json(result)
    })
  })


  router.get('/get-instagram',(req,res)=>{
    pool.query(`select * from instagram_stories`,(err,result)=>{
      if(err) throw err;
      else res.json(result)
    })
  })


  router.get('/get-story',(req,res)=>{
    pool.query(`select s.* , (select c.name from country c where c.id = s.countryid) as countryname from story s`,(err,result)=>{
      if(err) throw err;
      else res.json(result)
    })
  })



  
  router.get('/get-state',(req,res)=>{
    pool.query(`select s.* , (select c.name from country c where c.id = s.countryid) as countryname from state s`,(err,result)=>{
      if(err) throw err;
      else res.json(result)
    })
  })



  router.get('/get-tour',(req,res)=>{
    pool.query(`select * from tour`,(err,result)=>{
      if(err) throw err;
      else res.json(result)
    })
  })




module.exports = router;