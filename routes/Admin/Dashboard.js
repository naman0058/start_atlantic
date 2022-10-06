var express = require('express');
var router = express.Router();
var pool =  require('../pool');
var upload = require('../multer');
const { query } = require('../pool');
const { reset } = require('nodemon');




var table = 'admin'


router.get('/',(req,res)=>{
    if(req.session.adminid){
      
// res.render('Admin/Dashboard',{msg : ''})
res.redirect('/admin/dashboard/user/country')


   }
    else{
        res.render('Admin/login',{msg : '* Invalid Credentials'})

    }
})



router.get('/user/:name',(req,res)=>{
    if(req.session.adminid){
    res.render('Admin/'+req.params.name)
    }
    else {
        res.render('Admin/login',{msg : '* Invalid Credentials'})

    }
})



router.get('/listing-category',(req,res)=>{
    if(req.session.adminid){
    res.render('Admin/listing-category')
    }
    else {
        res.render('Admin/login',{msg : '* Invalid Credentials'})

    }
})


router.post('/user/:name/insert',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 8 } ,  { name: 'single_event_image', maxCount: 8 } , { name: 'tree_image', maxCount: 8 } ]),(req,res)=>{
    let body = req.body
 console.log('s')
    console.log(req.body)


    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = yyyy + '-' + mm + '-' + dd;
    
    
      body['date'] = today;


    if(req.files.single_event_image){
        body['image'] = req.files.image[0].filename;
        body['icon'] = req.files.icon[0].filename;
        body['single_event_image'] = req.files.single_event_image[0].filename;
        body['tree_image'] = req.files.tree_image[0].filename;

     console.log(req.body)
       pool.query(`insert into ${req.params.name} set ?`,body,(err,result)=>{
           err ? console.log(err) : res.json({msg : 'success'})
       })
    }

else if(req.files.icon){

    

    body['image'] = req.files.image[0].filename;
    body['icon'] = req.files.icon[0].filename;

    console.log(req.files.image[0].filename)
    // importExcelData2MySQL('public/images/' + req.files.image[0].filename);

    // readXlsxFile(req.files.image[0].filename).then((rows) => {
    //     // `rows` is an array of rows
    //     // each row being an array of cells.     
    //     console.log(rows);

    // })

 console.log(req.body)
   pool.query(`insert into ${req.params.name} set ?`,body,(err,result)=>{
       err ? console.log(err) : res.json({msg : 'success'})
   })
}
else if(req.files.image){

    body['image'] = req.files.image[0].filename;
    // body['icon'] = req.files.icon[0].filename;
 console.log(req.body)
   pool.query(`insert into ${req.params.name} set ?`,body,(err,result)=>{
       err ? console.log(err) : res.json({msg : 'success'})
   })
}

else{
    console.log(req.body)
    pool.query(`insert into ${req.params.name} set ?`,body,(err,result)=>{
        err ? console.log(err) : res.json({msg : 'success'})
    }) 
}


    
   
})


function importExcelData2MySQL(filePath){
    // File path.
    console.log(filePath)
    readXlsxFile(filePath).then((rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.     
    console.log('saahahs',rows);
// let query = 'INSERT INTO dummy_excel_data (business_name, name) VALUES ?';

//     pool.query(query,[rows],(err,result)=>{
//         if(err) console.log(err)
//         else console.log(result) 
//     })

    })

}



router.post('/channel-partner-insert',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 8 }]),(req,res)=>{
    let body = req.body
 
    console.log(req.files)

pool.query(`select * from state where id = '${req.body.categoryid}'`,(err,result)=>{
    if(err) throw err;
    else {
        let statecode = result[0].code;
        pool.query(`select * from city where id = '${req.body.subcategoryid}'`,(err,result)=>{
            if(err) throw err;
            else {
                let citycode = result[0].code;
                body['userid'] = statecode + citycode +  Math.floor(100 + Math.random() * 9000);
                if(req.files.icon){
                    body['image'] = req.files.image[0].filename;
                    body['icon'] = req.files.icon[0].filename;
                 console.log(req.body)
                   pool.query(`insert into channel_partner set ?`,body,(err,result)=>{
                       err ? console.log(err) : res.json({msg : 'success'})
                   })
                }
                else {
                    body['image'] = req.files.image[0].filename;
                    // body['icon'] = req.files.icon[0].filename;
                 console.log(req.body)
                   pool.query(`insert into channel_partner set ?`,body,(err,result)=>{
                       err ? console.log(err) : res.json({msg : 'success'})
                   })
                }
            }
        })
    }
})




    
   
})







router.post('/listing-category/insert',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 8 }]),(req,res)=>{
    let body = req.body
 
    console.log(req.files)

if(req.files.icon){
    body['image'] = req.files.image[0].filename;
    body['icon'] = req.files.icon[0].filename;
 console.log(req.body)
   pool.query(`insert into listing_category set ?`,body,(err,result)=>{
       err ? console.log(err) : res.json({msg : 'success'})
   })
}
else {
    body['image'] = req.files.image[0].filename;
    // body['icon'] = req.files.icon[0].filename;
 console.log(req.body)
   pool.query(`insert into listing_category set ?`,body,(err,result)=>{
       err ? console.log(err) : res.json({msg : 'success'})
   })
}


    
   
})



router.get('/user/:name/delete', (req, res) => {
    let body = req.body
    pool.query(`delete from ${req.params.name} where id = ${req.query.id}`, (err, result) => {
        if(err) {
            res.json({
                status:500,
                type : 'error',
                description:err
            })
        }
        else {
            res.json({
                status:200,
                type : 'success',
                description:'successfully delete'
            })
        }
    })
})




router.post('/user/:name/update', (req, res) => {
    let body = req.body
    pool.query(`update ${req.params.name} set ? where id = ?`, [req.body, req.body.id], (err, result) => {
        if(err) {
            res.json({
                status:500,
                type : 'error',
                description:err
            })
        }
        else {
            res.json({
                status:200,
                type : 'success',
                description:'successfully update'
            })

            
        }
    })
})





router.post('/user/:name/update-image',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 8 } ,  { name: 'single_event_image', maxCount: 8 } , { name: 'tree_image', maxCount: 8 } ]), (req, res) => {
    let body = req.body;


    if(req.files.image){
        body['image'] = req.files.image[0].filename;
      
      }
      else {
        body['image'] = ''
      }

      

      if(req.files.icon){
        body['icon'] = req.files.icon[0].filename;
      
      }


      if(req.files.single_event_image){
        body['single_event_image'] = req.files.single_event_image[0].filename;
        body['tree_image'] = req.files.tree_image[0].filename;
 
      }
      
      
  

    // pool.query(`select image from ${table} where id = '${req.body.id}'`,(err,result)=>{
    //     if(err) throw err;
    //     else {
    //         fs.unlinkSync(`public/images/${result[0].image}`); 


 pool.query(`update ${req.params.name} set ? where id = ?`, [req.body, req.body.id], (err, result) => {
        if(err) {
            res.json({
                status:500,
                type : 'error',
                description:err
            })
        }
        else {
            // res.json({
            //     status:200,
            //     type : 'success',
            //     description:'successfully update'
            // })

            res.redirect(`/admin/dashboard/user/${req.params.name}`)
        }
    })


})




router.get('/booking/list',(req,res)=>{
    pool.query(`select v.*
    from booking v order by id desc`,(err,result)=>{
        err ? console.log(err) : res.render('Admin/vendor-list',{result})
    })
})


router.get('/subscriber/list',(req,res)=>{
    pool.query(`select v.* 
    from subscribe v order by id desc`,(err,result)=>{
        err ? console.log(err) : res.render('Admin/subscriber-list',{result})
    })
})




router.get('/users/list',(req,res)=>{
    pool.query(`select v.* 
    from user v order by id desc`,(err,result)=>{
        err ? console.log(err) : res.render('Admin/user-list',{result})
    })
})



router.get('/agent/full/details/:id',(req,res)=>{
    pool.query(`select v.* , (select c.name from category c where c.id = v.categoryid) as categoryname from vendor v where v.agentid = '${req.params.id}' order by id desc`,(err,result)=>{
        err ? console.log(err) : res.render('Admin/vendor-list',{result})
    })
})


router.get('/channel_partner/list',(req,res)=>{
    pool.query(`select v.* from channel_partner v where v.status = 'active'  order by id desc`,(err,result)=>{
        err ? console.log(err) : res.render('Admin/channel-partner-list',{result})
    })
})


router.get('/agent/list',(req,res)=>{
    pool.query(`select v.* ,
    (select c.name from channel_partner c where c.id = v.channel_partner_id) as channel_partner_name,
    (select c.name from city c where c.id = (select cp.categoryid from channel_partner cp where cp.id = v.channel_partner_id)) as city_name
      from agent v  order by id desc`,(err,result)=>{
        err ? console.log(err) : res.render('Admin/agent-list',{result})
    })
})



router.get('/vendor/details/:id',(req,res)=>{
    var query = `select v.*,
    (select a.name from agent a where a.userid = v.agentid) as agentname,
    (select a.number from agent a where a.userid = v.agentid) as agentnumber,
    (select a.name from channel_partner a  where a.userid = v.channel_partner_id) as cp_name,
    (select a.number from channel_partner a where a.userid = v.channel_partner_id) as cp_number,
     (select c.name from category c where c.id = v.categoryid) as categoryname from vendor v where v.id = '${req.params.id}';`
    var query1 = `select sum(price) as total_price from booking where vendorid = '${req.params.id}';`
    var query2 = `select count(id) as total_orders from booking where vendorid = '${req.params.id}';`
    var query3 = `select count(id) as running_orders from booking where status != 'delivered' and vendorid = '${req.params.id}';`
    var query4 = `select count(id) as completed_orders from booking where status = 'delivered' and vendorid = '${req.params.id}';`
    var query5 = `select b.* , (select p.name from products p where p.id = b.booking_id) as productname from booking b where vendorid = '${req.params.id}' order by id desc limit 10;`

    pool.query(query+query1+query2+query3+query4+query5,(err,result)=>{
        if(err) throw err;
        else res.render('Admin/vendor-details',{result,vendorid:req.params.id})
    })
})



router.get('/channel_partner/details/:id',(req,res)=>{
    var query = `select v.* , (select c.name from city c where c.id = v.categoryid) as categoryname from channel_partner v where v.id = '${req.params.id}';`
    var query1 = `select sum(price) as total_price from booking where vendorid = '${req.params.id}';`
    var query2 = `select count(id) as total_orders from booking where vendorid = '${req.params.id}';`
    var query3 = `select count(id) as running_orders from booking where status != 'delivered' and vendorid = '${req.params.id}';`
    var query4 = `select count(id) as completed_orders from booking where status = 'delivered' and vendorid = '${req.params.id}';`
    var query5 = `select b.*  from agent b where channel_partner_id = '${req.params.id}' order by id;`

    pool.query(query+query1+query2+query3+query4+query5,(err,result)=>{
        if(err) throw err;
        else res.render('Admin/channel_partner_details',{result,vendorid:req.params.id})
    })
})





router.get('/listing/list/:type',(req,res)=>{
    pool.query(`select v.*  from driver v where v.status = '${req.params.type}' order by id desc`,(err,result)=>{
        err ? console.log(err) : res.render('Admin/listing-list',{result})
    })
})




router.get('/listing/details/:id',(req,res)=>{
    var query = `select v.* from driver v where v.id = '${req.params.id}';`
    var query1 = `select * from portfolio where listingid = '${req.params.id}';`
    
    pool.query(query+query1,(err,result)=>{
        if(err) throw err;
        else res.render('Admin/listing-details',{result})
    })
})



router.post('/vendor/update-status',(req,res)=>{
    
   pool.query(`update vendor set status = '${req.body.status}' where id = '${req.body.id}'`,(err,result)=>{
       if(err) throw err;
       else {
           console.log('result',result)
           res.send('success')
       }
   })
})



router.post('/product/update-status',(req,res)=>{
      pool.query(`update products set status = '${req.body.status}' where id = '${req.body.id}'`,(err,result)=>{
        if(err) throw err;
        else {
            console.log('result',result)
            res.send('success')
        }
    })
 })



router.post('/listing/update-status',(req,res)=>{
    
    pool.query(`update driver set status = '${req.body.status}' where id = '${req.body.id}'`,(err,result)=>{
        if(err) throw err;
        else {
            console.log('result',result)
            res.send('success')
        }
    })
 })
 


router.get('/orders/:type',(req,res)=>{
    if(req.params.type == 'runnning'){
       pool.query(`select b.* , 
       (select p.name from products p where p.id = b.booking_id) as bookingname,
       (select p.image from products p where p.id = b.booking_id) as bookingimage 
   
       from booking b where b.status != 'completed' and b.status != 'cancelled'  order by id desc`,(err,result)=>{
           err ? console.log(err) : res.render('Admin/ORder',{result, title:'Running Orders'})
       })
    }
    else if(req.params.type=='completed'){
       pool.query(`select b.* , 
       (select p.name from products p where p.id = b.booking_id) as bookingname,
       (select p.image from products p where p.id = b.booking_id) as bookingimage 
   
       from booking b where b.status = 'completed'  order by id desc`,(err,result)=>{
           err ? console.log(err) : res.render('Admin/ORder',{result, title:'Completed Orders'})
       })
    }
    else {
       pool.query(`select b.* , 
       (select p.name from products p where p.id = b.booking_id) as bookingname,
       (select p.image from products p where p.id = b.booking_id) as bookingimage 
   
       from booking b where b.status = 'cancelled'  order by id desc`,(err,result)=>{
           err ? console.log(err) : res.render('Admin/ORder',{result, title:'Cancelled Orders'})
       })
    }
   
      
   })





   router.get('/view/all/order/:id',(req,res)=>{
    pool.query(`select b.* , 
    (select p.name from products p where p.id = b.booking_id) as bookingname,
    (select p.image from products p where p.id = b.booking_id) as bookingimage 

    from booking b where b.vendorid = '${req.params.id}'  order by id desc`,(err,result)=>{
        err ? console.log(err) : res.render('Admin/ORder',{result, title:'Vendor Orders'})
    })
   })



   
   router.get('/users/orders/:number',(req,res)=>{
    pool.query(`select b.* , 
    (select p.name from products p where p.id = b.booking_id) as bookingname,
    (select p.image from products p where p.id = b.booking_id) as bookingimage 

    from booking b where b.usernumber = '${req.params.number}'  order by id desc`,(err,result)=>{
        err ? console.log(err) : res.render('Admin/ORder',{result, title:'Customer Orders'})
    })
   })




   router.get('/users/address/:number',(req,res)=>{
    pool.query(`select * from address where usernumber = '${req.params.number}'  order by id desc`,(err,result)=>{
        err ? console.log(err) : res.render('Admin/Address',{result, title:'Customer Orders'})
    })
   })




   router.get('/transaction/reports',(req,res)=>{
       if(req.session.adminid){
        res.render('Admin/transaction-reports')
       }
       else{
       res.redirect('/admin')
       }
       
   })







   router.get('/transaction/reports/bytype',(req,res)=>{
       var query = `select sum(amount) as total_amount_recieved from transaction t where  date between '${req.query.from_date}' and '${req.query.to_date}' and t.type = '${req.query.type}' and sign = '+';`
       var query1 = `select t.* , (select u.name from users u where u.number = t.number) as username from transaction t where date between '${req.query.from_date}' and '${req.query.to_date}' and t.type = '${req.query.type}' order by id desc;`
       var query2 = `select sum(amount) as total_amount_sent from transaction t where  date between '${req.query.from_date}' and '${req.query.to_date}' and t.type = '${req.query.type}' and sign = '-';`

       pool.query(query+query1+query2,(err,result)=>{
           if(err) throw err;
        //    00else res.render('Admin/transaction-talent-hunt',{result})
    else res.json(result)  
    })
   })



    
   
router.get('/product-request',(req,res)=>{
    pool.query(`select p.* ,
    (select c.name from category c where c.id = p.categoryid ) as categoryname,
    (select s.name from subcategory s where s.id = p.categoryid ) as subcategoryname,
    (select v.name from vendor v where v.id = p.vendorid ) as vendorname
    from products p  where status = 'pending'`,(err,result)=>{
        if(err) throw err;
        // else res.json(result)
        else res.render('Admin/product_request',{result})
    })
})



router.get('/product-request/details',(req,res)=>{
    var query = `select p.* , 
    (select c.name from category c where c.id = p.categoryid ) as categoryname,
    (select s.name from subcategory s where s.id = p.categoryid ) as subcategoryname,
    (select v.name from vendor v where v.id = p.vendorid ) as vendorname,
    (select v.number from vendor v where v.id = p.vendorid ) as vendornumber

    from products p where id = '${req.query.id}';`
    var query1 = `select * from images where productid = '${req.query.id}';`
    pool.query(query+query1,(err,result)=>{
        if(err) throw err;
       // else res.json(result)
        else res.render('Admin/single-product-request',{result})
    })
})




router.get('/users/normal',(req,res)=>{
    if(req.session.adminid){
        pool.query(`select * from users order by id desc`,(err,result)=>{
            if(err) throw err;
            else res.render('Admin/Users',{result})
        })
       }
       else{
       res.redirect('/admin')
       }
})







router.get('/users/listing',(req,res)=>{
    if(req.session.adminid){
        pool.query(`select * from listing order by id desc`,(err,result)=>{
            if(err) throw err;
            else res.render('Admin/Users',{result})
        })
       }
       else{
       res.redirect('/admin')
       }
})




router.get('/commission/list',(req,res)=>{
    pool.query(`select name , commission from subcategory order by name desc`,(err,result)=>{
        if(err) throw err;
        else res.render('Admin/commission',{result})
    })
})



router.get('/ecommerce/payout',(req,res)=>{
    if(req.session.adminid){
        res.render('Admin/payout-list')
       }
       else{
       res.redirect('/admin')
       }
})



router.get('/ecommerce/payout-history',(req,res)=>{
    pool.query(`select b.vendorid , b.price , b.date, b.subcategoryid, b.vendor_price,
    (select v.account_holder_name from vendor v where v.id = b.vendorid) as vendor_account_holder_name,
    (select v.ifsc_code from vendor v where v.id = b.vendorid) as vendor_ifsc_code,
    (select v.branch_name from vendor v where v.id = b.vendorid) as vendor_branch_name,
    (select v.account_type from vendor v where v.id = b.vendorid) as vendor_account_type,

    (select v.bank_name from vendor v where v.id = b.vendorid) as vendor_bank_name,
    (select v.number from vendor v where v.id = b.vendorid) as vendor_mobile_number,
    (select v.account_number from vendor v where v.id = b.vendorid) as vendor_account_number,
    (select s.commission from subcategory s where s.id = b.subcategoryid ) as company_commission
    from booking b where b.payout = 'completed' order by date desc;`,(err,result)=>{
        if(err) throw err;
        else res.render('Admin/payout-history',{result})
    })
})





router.get('/view/all/payout/:id',(req,res)=>{
    pool.query(`select b.*,
    (select p.name from products p where p.id = b.booking_id) as productname
    from booking b where b.payout is not null and b.vendorid = '${req.params.id}' order by date desc;`,(err,result)=>{
        if(err) throw err;
        else res.render('Admin/single-payout-history',{result})
    })
})



router.get('/ecommerce/payout-remaining',(req,res)=>{
    pool.query(`select b.vendorid , b.price , b.date, b.subcategoryid, b.vendor_price,
    (select v.account_holder_name from vendor v where v.id = b.vendorid) as vendor_account_holder_name,
    (select v.ifsc_code from vendor v where v.id = b.vendorid) as vendor_ifsc_code,
    (select v.branch_name from vendor v where v.id = b.vendorid) as vendor_branch_name,
    (select v.account_type from vendor v where v.id = b.vendorid) as vendor_account_type,

    (select v.bank_name from vendor v where v.id = b.vendorid) as vendor_bank_name,
    (select v.number from vendor v where v.id = b.vendorid) as vendor_mobile_number,
    (select v.account_number from vendor v where v.id = b.vendorid) as vendor_account_number,
    (select s.commission from subcategory s where s.id = b.subcategoryid ) as company_commission
    from booking b where b.payout is not null order by date desc;`,(err,result)=>{
        if(err) throw err;
        else res.render('Admin/payout-remaining',{result})
    })
})


router.get('/ecommerce/payout/report',(req,res)=>{
    var query = `select sum(vendor_price) as total_amount from booking b where b.payout is null and b.status = 'delivered' and date between '${req.query.from_date}' and '${req.query.to_date}';`
    var query1 = `select b.vendorid , b.price , b.date, b.subcategoryid, b.vendor_price, b.id,
    (select v.account_holder_name from vendor v where v.id = b.vendorid) as vendor_account_holder_name,
    (select v.ifsc_code from vendor v where v.id = b.vendorid) as vendor_ifsc_code,
    (select v.branch_name from vendor v where v.id = b.vendorid) as vendor_branch_name,
    (select v.account_type from vendor v where v.id = b.vendorid) as vendor_account_type,

    (select v.bank_name from vendor v where v.id = b.vendorid) as vendor_bank_name,
    (select v.number from vendor v where v.id = b.vendorid) as vendor_mobile_number,
    (select v.account_number from vendor v where v.id = b.vendorid) as vendor_account_number,
    (select s.commission from subcategory s where s.id = b.subcategoryid ) as company_commission
    from booking b where b.payout is null and b.status = 'delivered' and date between '${req.query.from_date}' and '${req.query.to_date}';`
    pool.query(query+query1,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})



router.get('/vendor/transaction',(req,res)=>{
    res.render('Admin/vendor-transaction')
})




router.get('/product/full/details/:id',(req,res)=>{
    pool.query(`select b.* , 
    (select p.name from products p where p.id = b.booking_id) as productname,
    (select v.name from vendor v where v.id = b.vendorid) as vendorname
    from booking b where b.id = '${req.params.id}'`,(err,result)=>{
        if(err) throw err;
        else res.render('Admin/single-order-details',{result})
    })
})



router.post('/update/booking-status',(req,res)=>{

    var today = new Date();
    var dd = today.getDate();
    
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = yyyy+'-'+mm+'-'+dd;
    


    let body = req.body;
    console.log(req.body)

    let c = JSON.parse(req.body.b)

    console.log('c',c)
    for(i=0;i<c.length;i++){
        let d = c[i]
        pool.query(`update booking set reference_id = '${req.body.reference_id}' , payout_date = '${today}' , payout = 'completed' where id = '${d}'`,(err,result)=>{
                    if(err) throw err;
                    else {

                    }
                })
          
    }
    res.json({
        msg : 'success'
    })
})

// All Data Found









router.post('/catalogue/insert',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]),(req,res)=>{
    let body = req.body
 
    // console.log(req.files)
    if(req.body.discount==0 || req.body.discount == null){
        body['net_amount'] = req.body.price
    }
    else{
        let price = ((req.body.price)*(req.body.discount))/100
        let net_price = (req.body.price)-price
        body['net_amount'] = Math.round(net_price);
        body['categoryid'] = req.session.categoryid;
    }



    body['image'] = req.files.image[0].filename;
    body['thumbnail'] = req.files.thumbnail[0].filename;
 console.log('mydata',req.body)
   pool.query(`insert into catalogue set ?`,body,(err,result)=>{
       err ? console.log(err) : res.json({msg : 'success'})
   })

   
})


router.get('/catalogue/show-product',(req,res)=>{
    pool.query(`select p.* , 
    (select s.name from category s where s.id = p.categoryid) as categoryname
     from catalogue p order by id desc`,(err,result)=>{
        err ? console.log(err) : res.json(result)
    })
})


router.get('/catalogue/delete',(req,res)=>{
    pool.query(`delete from catalogue where id = '${req.query.id}'`,(err,result)=>{
        err ? console.log(err) : res.json(result)
    })
})




router.post('/catalogue/update', (req, res) => {
    let body = req.body
    if(req.body.discount==0 || req.body.discount == null){
        body['net_amount'] = req.body.price

    }
    else{
        let price = ((req.body.price)*(req.body.discount))/100
        let net_price = (req.body.price)-price
        body['net_amount'] = Math.round(net_price);
  
    }
    console.log(req.body)
    pool.query(`update catalogue set ? where id = ?`, [req.body, req.body.id], (err, result) => {
        if(err) {
            res.json({
                status:500,
                type : 'error',
                description:err
            })
        }
        else {
            res.json({
                status:200,
                type : 'success',
                description:'successfully update'
            })

            
        }
    })
})



router.post('/catalogue/update-image',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'thumbnail', maxCount: 8 }]), (req, res) => {
let body = req.body;
body['image'] = req.files.image[0].filename;
body['thumbnail'] = req.files.thumbnail[0].filename;


// pool.query(`select image from ${table} where id = '${req.body.id}'`,(err,result)=>{
//     if(err) throw err;
//     else {
//         fs.unlinkSync(`public/images/${result[0].image}`); 


pool.query(`update catalogue set ? where id = ?`, [req.body, req.body.id], (err, result) => {
    if(err) {
        res.json({
            status:500,
            type : 'error',
            description:err
        })
    }
    else {
        // res.json({
        //     status:200,
        //     type : 'success',
        //     description:'successfully update'
        // })

        res.redirect(`/admin/dashboard/user/catalogue`)
    }
})


})


module.exports = router;
