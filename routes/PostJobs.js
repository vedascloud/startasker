var express = require('express');
var router = express.Router();
var PostJobs = require('../Controllers/PostJobs/PostJobs');
var verifyToken = require('./VerifyToken');
const fileUpload = require('express-fileupload');


router.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

router.post('/',verifyToken,function(req,res,next){
    console.log('request body...',req.body);
      if(typeof req.body === 'undefined'){
        res.json({result:'0',message:'no request content'});
    }else{ 
        PostJobs.postjobs(req.body,req.files,req.headers,req,(result) => {
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

    router.post('/get',verifyToken,function(req,res,next){
      console.log('request body...',req.body);
        if(typeof req.body === 'undefined'){
          res.json({result:'0',message:'no request content'});
      }else{ 
          PostJobs.get(req.body,(result) => {
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

      router.get('/fetch_all',verifyToken,function(req,res,next){     
        if(typeof req.body === 'undefined'){
          res.json({result:'0',message:'no request content'});
      }else{ 
          PostJobs.fetchAllJobs((result) => {
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
        console.log('request body...',req.body);
          if(typeof req.body === 'undefined'){
            res.json({result:'0',message:'no request content'});
        }else{ 
            PostJobs.update(req.body,req.files,req.headers,req,(result) => {
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

        router.post('/browsejob',verifyToken,function(req,res,next){
          console.log('request body...',req.body);
            if(typeof req.body === 'undefined'){
              res.json({result:'0',message:'no request content'});
          }else{ 
              PostJobs.browseJobs(req.body,(result) => {
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

          router.delete('/:postId',verifyToken,function(req,res,next){
            console.log('request params...',req.params);
              if(typeof req.params === 'undefined'){
                res.json({result:'0',message:'no request content'});
            }else{ 
                PostJobs.deleteJob(req.params,(result) => {
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

            router.post('/add_job_to_favourite',verifyToken,function(req,res,next){
              console.log('request body...',req.body);
                if(typeof req.body === 'undefined'){
                  res.json({result:'0',message:'no request content'});
              }else{ 
                  PostJobs.addJobToFavourite(req.body,(result) => {
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

              router.post('/add_comment',verifyToken,function(req,res,next){
                console.log('request body...',req.body);
                  if(typeof req.body === 'undefined'){
                    res.json({result:'0',message:'no request content'});
                }else{ 
                    PostJobs.addCommentToPost(req.body,(result) => {
                     console.log('result',result.status);
                       if(result.status === 400) {
                        res.statusCode = result.status;
                        res.send(result.data.message);
                        return;
                       }
                        res.json(result);
                    });
                }
                }); 
                router.put('/filled',verifyToken,function(req,res,next){
                  console.log('request body...',req.body);
                    if(typeof req.body === 'undefined'){
                      res.json({result:'0',message:'no request content'});
                  }else{ 
                      PostJobs.updatePostJobAsFilled(req.body,(result) => {
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