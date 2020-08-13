module.exports = function(app, Product){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
    var router = express.Router();
    const path = require("path");
    const multer = require("multer");
    var fs = require('fs');
    //상품 등록
    router.post('/add' , function (req, res) {
        
        var product = new Product();
        product.name = req.body.name ;
        product.seller = req.user._id;
        product.price = req.body.price;
        product.reserveMethod = req.body.reserveMethod;
        product.reserveFee = req.body.reserveFee;
        product.image = req.body.image;
        product.category = req.body.category;
        product.site = req.body.site;
        product.shippingMethod = req.body.shippingMethod;
        product.shippingFee = req.body.shippingFee;
        if(typeof(req.body.optionName) == 'string')
        {
            var list = {
                name : req.body.optionName,
                detail : req.body.detailName,
                stock : req.body.lastNameone,
                price : req.body.lastNametwo
            };
            product.option.push(list);
        }
        else
        {
            for(var i = 0 ; i < req.body.optionName.length; i++)
            {
                var list = {
                    name : req.body.optionName[i],
                    detail : req.body.detailName[i],
                    stock : req.body.lastNameone[i],
                    price : req.body.lastNametwo[i]
                };
                product.option.push(list);
            }
        }
        
        if(typeof(req.body.info) == 'string')
        {
            var list = {
                info: req.body.info,
                description: req.body.description
            };
            product.information.push(list);
        }
        else{
            for(var i = 0 ; i < req.body.info.length; i++)
            {
                var list = {
                    info: req.body.info[i],
                    description: req.body.description[i]
                };
                product.information.push(list);
            }
        }
        
        if(req.body.newProduct != undefined) product.feature.push("newProduct")
        if(req.body.bestProduct != undefined) product.feature.push("bestProduct")
        if(req.body.saleProduct != undefined) product.feature.push("saleProduct")
        product.save(function(err){
            if(err){
                console.log(err)
                res.json({result : 0});
                return
            }
            res.redirect('/App/ProductAdd')
        })
       
    })
    
    router.get('/check' , function (req, res) {

        const keyword = req.query.keyword 
        const keyText = req.query.keyText 
        if(typeof keyword == "undefined") // 검색사용 x
        {
            Product.find().populate('seller').skip((req.query.page - 1) * 10).limit(10)
            .then(ord =>{
                res.send(ord)
            })
        }
        else 
        {
            if(keyword === 'seller')
            {               
                Product.find().populate({path : 'seller', match : {Name:keyText} })
                .then(ord =>{
                    ord = ord.filter(idx => idx.seller != null);
                    res.send(ord.slice( (req.query.page - 1) * 10, req.query.page * 10  ))
                })
            }
            else if(keyword === 'orderNum')
            {
                Product.find({name : keyText}).populate('seller')
                .then(ord =>{
                    ord = ord.filter(idx => idx.seller != null);
                    res.send(ord.slice( (req.query.page - 1) * 10, req.query.page * 10  ))
                })
            }
        }
    })

    router.get('/selected', function (req, res) {
        const id = req.query.id 
        if(id == "init") res.end()
        else{
            Product.find({_id : id}).populate('seller')
            .then(ord =>{
                res.send(ord)
            })
        }
        
    })

    router.get('/getAuth', function(req, res){
        const productId = req.query.productId;
        const requestUser = req.user._id
        Product.find({_id : productId})
            .then(ord =>{
                if(requestUser == ord[0].seller) res.send(true)
                else res.send(false)
            })
    })

    router.put('/update', function(req,res){
        Product.updateOne({_id : req.body.productObject._id},req.body.productObject , function(err,output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output) return res.status(404).json({ error: 'book not found' });
            res.end();
        })

    })

    
    const storage = multer.diskStorage({
        // destination: "./public/img/",
        destination: path.join(__dirname,'/../../img'),
        filename: function(req, file, cb) {
            // + path.extname(file.originalname)
            // console.log(file) originalname:
          cb(null, file.originalname );
        }
      });
      const upload = multer({
        storage: storage,
        limits: { fileSize: 1000000 }
      });

    router.post("/uploadimg", upload.array("img"), function(req, res, next) {
        // console.log(req.files)
        res.send({
            // fileName: req.file.filename
            imgfiles: req.files
        });
    });

    router.get('/imgs/:imgId',function(req, res){
        fs.readFile(path.join(__dirname,`/../../img/`+req.params.imgId),function(error, data){
            res.writeHead(200, { "Context-Type": "image/jpg" });//보낼 헤더를 만듬
            res.write(data);   //본문을 만들고
            res.end();
        })
    });
    return router;	//라우터를 리턴
};