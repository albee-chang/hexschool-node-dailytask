const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema( {
    name: String,
    price: {
        type: Number,
        required:[true,'價格必填']
    },
    rating: Number,
    createdAt: {
        type: Date,
        default: Date.now, // 當沒有傳入值時，預設為當前時間
        select: false // 不要顯示在前台
    }
},{
    versionKey: false, // 不要 _v
    // timestamps: true, // 建立時間、更新時間
})
// 建立名為 Room 的 modal
const Room = mongoose.model('Room',roomSchema);

// Path: course-mongoose\server.js
module.exports = Room;