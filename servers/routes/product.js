module.exports = function(app, Product){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
    var router = express.Router();
    
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

    router.post('/update', function(req,res){
        console.log(req.body.productObject.option)
        res.redirect('/')
    })
    return router;	//라우터를 리턴
};