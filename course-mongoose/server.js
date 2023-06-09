const http = require('http');
const Room = require('./models/room');
// const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { log } = require('console');

// dotenv.config({ path: './config.env' });

// 連接資料庫
mongoose.connect('mongodb://127.0.0.1:27017/hotel')
    .then(()=>{
        console.log('資料庫連線成功')
    })
    .catch((error)=>{
        console.log(error.reason);
    });

// 刪除單筆資料
Room.findByIdAndDelete('5f9c1b1b1b1b1b1b1b1b1b1b').then(()=>{
    console.log('刪除成功');
}).catch(error=>{
    console.log(error);
})
// 更新單筆資料
Room.findByIdAndUpdate('5f9c1b1b1b1b1b1b1b1b1b1b',{
    name: '總統超級單人房',
    price: 200,
    rating: 4.5
}).then(()=>{
    console.log('更新成功');
}).catch(error=>{
    console.log(error);
})

const requestListener = async (req,res)=>{
    let body = [];
    req.on('data', (chunk) => {
        body += chunk;
    });
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
    }
    if(req.url=='/rooms' && req.method=='GET'){
        const rooms = await Room.find();
        res.writeHead(200,headers);
        res.write(JSON.stringify({
            "status": 'success',
            rooms
        }));
        res.end();
    }else if (req.url=='/rooms' && req.method=="POST"){
        req.on('end',async ()=>{
            try {
                const data = JSON.parse(body);
                const newRoom = await Room.create(
                    {
                    name: data.name,
                    price: data.price,
                    rating: data.rating
                })
                res.writeHead(200,headers);
                res.write(JSON.stringify({
                    "status": 'success',
                    rooms : newRoom
                }));
                res.end();
            } catch (error) {
                res.writeHead(400,headers);
                res.write(JSON.stringify({
                    "status": 'false',
                    "message": '欄位沒有正確填寫',
                    "error": error.errors
                }));
                res.end();
            }
        })
    }else if(req.url=='/rooms' && req.method=="DELETE"){
        await Room.deleteMany();
        res.writeHead(200,headers);
        res.write(JSON.stringify({
            "status": 'success',
            rooms:[]
        }));
        res.end();
    }else if(req.url=='/rooms' && req.method=="PATCH"){
        req.on('end',async ()=>{
            try {
                const data = JSON.parse(body);
                const newRoom = await Room.updateOne(
                    {
                    name: data.name,
                    price: data.price,
                    rating: data.rating
                })
                res.writeHead(200,headers);
                res.write(JSON.stringify({
                    "status": 'success',
                    rooms : newRoom
                }));
                res.end();
            } catch (error) {
                res.writeHead(400,headers);
                res.write(JSON.stringify({
                    "status": 'false',
                    "message": '欄位沒有正確填寫',
                    "error": error.errors
                }));
                res.end();
            }
        })
    }
    
    else if(req.method=="OPTIONS"){
        res.writeHead(200,headers);
        res.end();
    }else {
        res.writeHead(404,headers);
        res.write(JSON.stringify({
            "status": 'false',
            "message": '找不到網址'
        }));
        res.end();
    }

}

const server = http.createServer(requestListener);
server.listen(3005);