const express = require('express')
const { CreateBlog, GetBlogs, PutBlogs, DeleteBlog , GetOneBlog} = require('../controllers/BlogController')
const {CreateGuyst , GetGuyst  , UpdateGuyst , DeleteGuyst , IsGuyst, GetCode, VerifyCode, LoginGuyst} = require('../controllers/GuystController')
const shihab = express.Router()
const multer = require('multer')
const path = require('path')
const VerifyUser = require('./middleware/UserMiddleware')
const Cloud  = require('../cloud/gcloud')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Uploads")
    },
    filename: function (req, file, cb) {
        const dataname = Math.floor(200000000 + Math.random() * 900000);
        const actual = dataname + "file" + path.extname(file.originalname)
        cb(null, actual)
        req.body.blogfilename = actual
        req.body.newfile = actual
    } 
})
const upload = multer({ storage: storage })

shihab.post('/blog', upload.array('blogfile'),Cloud, CreateBlog)
shihab.get('/blogs', GetBlogs)
shihab.put('/blog', PutBlogs)
shihab.delete('/blog', DeleteBlog)
shihab.get('/blog/:id' , GetOneBlog)

// guyst router

shihab.post('/guyst', CreateGuyst);
shihab.get('/guyst/:id', GetGuyst)
shihab.put('/guyst/:id', UpdateGuyst)
shihab.delete('/guyst/:id', DeleteGuyst)
shihab.get('/isguyst' , VerifyUser, IsGuyst)
shihab.post('/guyst/sentcode' , VerifyUser , GetCode)
shihab.post('/guyst/verifycode' , VerifyUser , VerifyCode)
shihab.post('/guyst/login' , LoginGuyst)
// end guyst router




shihab.post("/upload" , upload.array('file'), Cloud, async(req,res)=>{
 
    return res.json(req.files)

})



module.exports = shihab

