module.exports = function(app, Product){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
    var router = express.Router();
    
    //상품 등록
    router.post('/add' , function (req, res) {
        
        var product = new Product();
        product.name = req.body.productName ;
        product.seller = req.user._id;
        product.price = req.body.productSalePrice;
        product.image = req.body.productImage;
        product.category = req.body.category;
        product.site = req.body.productSite;
        product.shippingMethod = req.body.shippingFee;
        product.shippingFee = req.body.seperateRatio;
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
        
        if(typeof(req.body.firstName) == 'string')
        {
            var list = {
                info: req.body.firstName,
                description: req.body.lastName
            };
            product.information.push(list);
        }
        else{
            for(var i = 0 ; i < req.body.firstName.length; i++)
            {
                var list = {
                    info: req.body.firstName[i],
                    description: req.body.lastName[i]
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
    return router;	//라우터를 리턴
};