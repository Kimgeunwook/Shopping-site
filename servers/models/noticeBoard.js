const mongoose = require('mongoose');

// schema
const noticeBoardSchema = mongoose.Schema({ 
    type : String, // 공지 or 일반글
    title : String,
    content : String,
    writer : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
    },
    writeDate:{type:Date, default:Date.now},
    comment : [{
        writer : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
        },

        content : String
        }]
});


module.exports = mongoose.model('noticeBoards', noticeBoardSchema);