var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool')


var table = 'tour';


router.get('/',(req,res)=>{
    res.render('tour')
})



router.post('/insert',upload.fields([{ name: 'image', maxCount: 10 }, { name: 'logo', maxCount: 1 }]),(req,res)=>{
	let body = req.body
	// body['logo'] = req.file.filename;
	console.log(req.files.image.length)
	// console.log(req.files)

    
    	pool.query(`insert into ${table} (countryid,stateid,name,tour_days,short_description,logo) values('${req.body.countryid}' , '${req.body.stateid}' , '${req.body.name}' , '${req.body.tour_days}' , '${req.body.short_description}' , '${req.files.logo[0].filename}') `,(err,result)=>{
    		if(err) throw err;
    		else{
    // console.log(result)
                let id = result.insertId
        
                for(i=0;i<req.body.includes.length;i++){
                    pool.query(`insert into includes(name,tourid,short_description) values('${req.body.includes[i]}' , '${id}' , '${req.body.includes_description[i]}')`,(err,result)=>{
                        if(err) throw err;
                        else{

                        }
                    })
                }


                for(j=0;j<req.body.days.length;j++){
                    pool.query(`insert into days(name,value,tourid,description) values('${req.body.days[j]}' , '${req.body.days_description[j]}' , '${id}' , '${req.body.days_heading[j]}')`,(err,result)=>{
                        if(err) throw err;
                        else{
                            
                        }
                    })
                }


                for(k=0;k<req.files.image.length;k++){
                    pool.query(`insert into images(name,tourid) values('${req.files.image[k].filename}' , '${id}')`,(err,result)=>{
                        if(err) throw err;
                        else{
                            
                        }
                    })
                }


              res.redirect('/admin/dashboard/user/tour')

            }
    	})
})


router.get('/show',(req,res)=>{
	pool.query(`select t.* , 
    (select c.name from country c where c.id = t.countryid) as countryname,
    (select c.name from state c where c.id = t.stateid) as statename

    
    from ${table} t`,(err,result)=>{
		err ? console.log(err) : res.json(result)
	})
})



router.get('/delete', (req, res) => {
    const { id } = req.query
    pool.query(`delete from ${table} where id = ${id}`, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})

router.post('/update', (req, res) => {
    console.log(req.body)
    pool.query(`update ${table} set ? where id = ?`, [req.body, req.body.id], (err, result) => {
        if(err) throw err;
        else res.json(result);
    })
})




router.post('/update_image',upload.single('logo'), (req, res) => {
    let body = req.body;

    body['logo'] = req.file.filename

    pool.query(`update ${table} set ? where id = ?`, [req.body, req.body.id], (err, result) => {
        if(err) throw err;
       else  res.redirect('/tour')
    })
})












module.exports = router;