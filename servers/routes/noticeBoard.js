module.exports = function(app, NoticeBoard){//함수로 만들어 객체 app을 전달받음
	var express = require('express');
    var router = express.Router();
    //상품 등록
    router.post('/add' , function (req, res) {
        var noticeBoard = new NoticeBoard();
        noticeBoard.type = req.body.noticeObject.type ;
        noticeBoard.title = req.body.noticeObject.title;
        noticeBoard.content = req.body.noticeObject.content;
        noticeBoard.writer = req.user._id;
        noticeBoard.save(function(err){
            if(err){
                console.log(err)
                res.json({result : 0});
                return
            }
            res.send();
        })
    })
    
    router.get('/table', function (req, res) {
        NoticeBoard.find().populate('writer').skip((req.query.page - 1) * 10).limit(10)
        .then(ord =>{
            res.send(ord)
        })
    })
    
    router.get('/detail', function (req, res) {
        const id = req.query.id
        NoticeBoard.find({_id : id}).populate('writer')
        .then(ord =>{
            res.send(ord)
        })
	})
    return router;	//라우터를 리턴
};