var express = require('express');
var router = express.Router();
var verifyToken = require('./VerifyToken');
const fileUpload = require('express-fileupload');
var Customer = require('../Controllers/Customers/Customers');

router.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

router.post('/register',function(req,res,next){
  console.log('req body...',req.body);
  if(typeof req.body === 'undefined'){
    res.json({result:'0',message:'no request content'});
}else{ 
  Customer.registration(req.body,(result) => {
     console.log('result',result.status);
       if(result.status === 400) {
        res.statusCode = result.status;
        res.send(result.data.message);
        return;
       }
        res.json(result.data);
    });
}
})
  router.post('/verify',function(req,res,next){
    console.log('request body...',req.body);
      if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{ 
      Customer.verify(req.body,(result) => {
         console.log('result',result.status);
           if(result.status === 400) {
            res.statusCode = result.status;
            res.send(result.data.message);
            return;
           }
            res.json(result.data);
        });
    }
    }); 

    router.post('/login',function(req,res,next){
      console.log('request body...',req.body);
        if(typeof req.body === 'undefined'){
          res.json({result:'0',message:'no request content'});
      }else{ 
        Customer.login(req.body,(result) => {
           console.log('result',result.status);
             if(result.status === 400) {
              res.statusCode = result.status;
              res.send(result.data.message);
              return;
             }
              res.json(result.data);
          });
      }
      }); 

      router.post('/forgot',function(req,res,next){
        console.log('request body...',req.body);
          if(typeof req.body === 'undefined'){
            res.json({result:'0',message:'no request content'});
        }else{ 
          Customer.forgotpassword(req.body,(result) => {
             console.log('result',result.status);
               if(result.status === 400) {
                res.statusCode = result.status;
                res.send(result.data.message);
                return;
               }
                res.json(result.data);
            });
        }
        }); 

        router.put('/reset_password',function(req,res,next){
          console.log('request body...',req.body);
            if(typeof req.body === 'undefined'){
              res.json({result:'0',message:'no request content'});
          }else{ 
            Customer.reset(req.body,(result) => {
               console.log('result',result.status);
                 if(result.status === 400) {
                  res.statusCode = result.status;
                  res.send(result.data.message);
                  return;
                 }
                  res.json(result.data);
              });
          }
          }); 

        router.put('/',verifyToken,function(req,res,next){
          if(typeof req.body === 'undefined'){
            res.statusCode = 400;
            res.json({result:'0',message:'no request content'});
        }else{ 
          Customer.update(req.body,req.files,req.headers,req,(result) => {
             console.log('result',result.status);
               if(result.status === 400) {
                res.statusCode = result.status;
                res.send(result.data.message);
                return;
               }
                res.json(result.data);
            });
        }
        });

        router.post('/checkavailability',function(req,res,next){
          console.log('request body...',req.body);
            if(typeof req.body === 'undefined'){
              res.json({result:'0',message:'no request content'});
          }else{ 
            Customer.checkUserNameAvailablity(req.body,(result) => {
               console.log('result',result.status);
                 if(result.status === 400) {
                  res.statusCode = result.status;
                  res.send(result.data.message);
                  return;
                 }
                  res.json(result.data);
              });
          }
          }); 

          router.delete('/account',verifyToken,function(req,res,next){
            console.log('request body...',req.body);
              if(typeof req.body === 'undefined'){
                res.json({result:'0',message:'no request content'});
            }else{ 
              Customer.deleteAccount(req.body,(result) => {
                 console.log('result',result.status);
                   if(result.status === 400) {
                    res.statusCode = result.status;
                    res.send(result.data.message);
                    return;
                   }
                    res.json(result.data);
                });
            }
            }); 

            router.post('/social_media',function(req,res,next){
              console.log('request body...',req.body);
                if(typeof req.body === 'undefined'){
                  res.json({result:'0',message:'no request content'});
              }else{ 
                Customer.social_media(req.body,(result) => {
                   console.log('result',result.status);
                     if(result.status === 400) {
                      res.statusCode = result.status;
                      res.send(result.data.message);
                      return;
                     }
                      res.json(result.data);
                  });
              }
              }); 
  
  module.exports = router;