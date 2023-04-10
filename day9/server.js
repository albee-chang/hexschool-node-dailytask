const http = require("http");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test')
.then(()=>{
  console.log('資料庫連線成功')
})
.catch((error)=>{
  console.log(error);
});
const drinkSchema = new mongoose.Schema({  
  product: {
    type: String,
    required: [true, '產品名稱未填寫']
  },
  price: {
    type: Number,
    required: [true, '價錢未填寫'] 
  },
  ice: {
    type: String,
    default: "正常冰"
  },
  sugar: {
    type: String,
    default: "全糖"
  },
  toppings: [{
      type: String,
      enum: ["珍珠", "椰果", "粉條"],
      default: '',
    }],
  createdAt: {
    type: Date, 
    default: Date.now,
    select: false
  },

 },{
  versionKey: false,
});

const Drink = mongoose.model('Drink', drinkSchema);

/* 可先執行這段新增資料到 drinks collection */
// Drink.create({
//   product: '鮮奶茶',
//   price: 56,
//   sugar: '半糖'
// },{
//   product: '烏龍鮮奶茶',
//   price: 60,
//   sugar: '微糖'
// },{
//   product: '四季春茶',
//   price: 30,
//   sugar: '少糖',
//   ice: "去冰"
// })


/*
可先在此填寫答案，並使用 GET 測試是否更新、刪除成功
...









*/
  
const requestListener = async (req,res)=>{
  let body = "";
  req.on('data',chunk=>{
      body+=chunk;
  })
  const headers = {
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
      'Content-Type': 'application/json'
  }
  if(req.url=="/drinks" && req.method=="GET"){
      const drinks = await Drink.find();
      res.writeHead(200,headers);
      res.write(JSON.stringify({
          "status":"success",
          drinks
      }))
      res.end()
  }else if(req.url=="/drinks" && req.method=="POST"){
      req.on('end', async()=>{
          try{
              const data = JSON.parse(body);
              const newDrink = await Drink.create(
                  {
                    product: data.product,
                    price: data.price,
                    toppings: data.toppings,
                  }
              )
              res.writeHead(200,headers);
              res.write(JSON.stringify({
                  "status":"success",
                  drinks: newDrink
              }))
              res.end()
          }catch(error){
              res.writeHead(400,headers);
              res.write(JSON.stringify({
                  "status": "false",
                  "message":"欄位沒有正確，或沒有此 ID",
                  "error": error
              }))
              res.end()
          }
      })
  }
  else if(req.url=="/drinks" && req.method=="DELETE"){
      await Drink.deleteMany({});
      res.writeHead(200,headers);
      res.write(JSON.stringify({
          "status":"success",
          drinks:[]
      }))
      res.end();
  }
  else if(req.method == "OPTIONS"){
      res.writeHead(200,headers);
      res.end();
  }else{
      res.writeHead(404,headers);
      res.write(JSON.stringify({
          "status": "false",
          "message": "無此網站路由"
      }));
      res.end();
  }
}

const server = http.createServer(requestListener);
server.listen(3005);