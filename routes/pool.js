
var mysql = require('mysql')
require('dotenv').config()

const pool = mysql.createPool({

  host : 'db-mysql-blr1-69812-do-user-12247241-0.b.db.ondigitalocean.com',
   user: 'doadmin',
  password:'AVNS_y2INtIf0l_w0ZJgiY29',
    database: 'atlantic',
    port:'25060' ,
    multipleStatements: true

  })



  // country , story , blog-category , blogs , state , 



  // var mysql = require('mysql')
  // require('dotenv').config()
  
  // const pool = mysql.createPool({
  //   host:'103.117.180.114',
  //   ///host : 'localhost',
  //    user: 'shopsun_shopsun',
  //   password:'Shopsun@321!',
  //     database: 'shopsun_shopsun',
  //     port:'3306' ,
  //     multipleStatements: true
  //   })
  
  
  
  
  // module.exports = pool;

module.exports = pool;