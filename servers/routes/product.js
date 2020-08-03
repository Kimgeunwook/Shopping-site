module.exports = function(app, Product){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
    var router = express.Router();
    router.post('/add' , function (req, res) {
        // console.log(req.body)    

        var product = new Product();
        product.name = req.body.productName ;
        product.seller = req.user._id;
        product.price = [req.body.productSalePrice];
        product.stock = [req.body.maxNumPurchase];
        product.option = [req.body.optionName];
        product.image = req.body.productImage;
        product.category = '카테고리';
        product.feature = '특징';

        product.save(function(err){
            if(err){
                console.log('오류@@@@@@@@@@')
                res.json({result : 0});
                return
            }
            console.log('오류아님@@@@@@@@@@')
            res.redirect('/App/ProductAdd')
            // res.json({result : 1});
        })
       
    })
    
    
    return router;	//라우터를 리턴
};