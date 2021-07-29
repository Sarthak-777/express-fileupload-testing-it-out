const express = require('express')
const router = new express.Router()
const path = require('path')
const connection = require('../database/mysql')
const fileUpload = require('express-fileupload')

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/templates/index.html'))
})

router.post('/',(req,res)=>{
    console.log(req.files)
    let imgName = req.files.uploaded_image
    let uploadPath = path.join(__dirname,'../images/')
    console.log(uploadPath + imgName.name)
    imgName.mv(uploadPath + imgName.name, function(err){
        if(err){
            return res.status(400).send(err)
        }
        connection.query('INSERT INTO images SET image = ?', [imgName.name], (err, row)=>{
            if(err){
                res.status(400).send(err)
            }
            res.status(200).send({
                'success': 'image saved'
            })
        })
    })
})

module.exports = router