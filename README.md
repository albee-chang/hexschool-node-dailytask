# Mongoose

### 前言

使用 Mongoose 可以通過定義 Schema 和 Model 的方式來管理數據庫，並且可以通過 Mongoose 提供的 API 進行 CRUD 操作。Mongoose 還支持數據驗證、中間件等功能，方便了開發人員對數據庫的操作和管理。

- Mongoose 是 MongoDB 的 ODM（Object Data Modeling）套件，Mongoose 套件會藉由 MongoDB driver 操作資料庫的資料
- 使用 ODM 通常可以降低開發和維護成本，因 ODM 會使用 JavaScript 的物件反映出資料庫中的資料，相對於使用資料庫原生的查詢語言 (SQL)，用 ODM 的方式操作資料庫會更好上手
- 每個後端語言都有自己的 Driver(驅動程式)，必須透過 Driver 才能造訪資料庫
- 在 Node.js 環境下操作 MongoDB 數據庫的工具，提供了一個基於 Schema 的方法來操作數據庫
- Mongoose 
https://whimsical.com/mongoose-YKTKL5aF4pHQbkemgQTMZH

### ****環境建立與專案講解****
- 建立一個資料夾，使用 npm init 建立 package.json 檔案

```bash
cd my-project
npm init
```
### 在專案中安裝 Mongoose

```bash
npm install mongoose --save
```

### 引入 mongoose 套件並連線 MongoDB 資料庫

```jsx
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
// test 為資料庫的名稱，可以改為自己的資料庫名稱
```

- 新增一支 server.js ，並寫入

```jsx
const http = require("http");
const mongoose = require('mongoose'); //載入 Mongoose NPM 套件

// 連接資料庫 hotel為資料庫名稱，可以改為自己的資料庫名稱
mongoose.connect('mongodb://localhost:27017/hotel')
    .then(()=>{
        console.log('資料庫連線成功')
    })
    .catch((error)=>{
        console.log(error);
    });

const requestListener = (req,res)=>{
    console.log(req.url);
    res.end();
}

const server = http.createServer(requestListener);
server.listen(3005);
```

1. 運行 Node.js 看 console 是否有連線成功

```bash
nodemon server.js
```

---

### ****Mongoose 詞彙小教室 ： Schema(綱要)、Model(模型)****

**[Defining your schema](https://mongoosejs.com/docs/guide.html#definition) >可以把關傳入的資料**

```jsx
import mongoose from 'mongoose';
const { Schema } = mongoose; //載入 Schema

//建立 Schema（資料庫綱要）
const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});
```

****Model 優點:****

1. ****Model 一定要連結指定的 Collections****
2. ****Model 可以載入 Schema ，把關驗證所有寫入資料庫的資料(要符合特定格式)****

---

### **Schema**

- 安裝 Mongoose 並連線至資料庫後，接著可以開始建立 Schema（資料庫綱要），定義需要哪些資料、型別、是否顯示、預設值… 等等

例如：[文件](https://mongoosejs.com/docs/guide.html)中列出 Blog 的 Schema

```jsx
const blogSchema = new mongoose.Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
```

> 當接收到資料，就可以依此 Schema 把關資料是否帶入正確
> 
- Schema 中會有需要帶入的資料屬性，title、author 等等，並會針對此資料加入相關設定，例如：型別、必填、預設… 等等

### 🍁 **type**

```jsx
title: {type: String} // 代表 title 需為一個字串
```

若只有設定型別可以使用簡寫 `title: String`

- 若 title 是一個**物件**，可以針對裡面的屬性設定型別

```jsx
title: {
  chinese: {type: String},
  english: {type: String}
}
```

- 若 title 為一個**陣列**，也可指定陣列中資料型別

```jsx
title: [{type: String}] // 若只有設定型別可以使用簡寫 [String]
```

### 🍁 **required**

- 若此資料需為必填項目，可以設定 required，並且可客製化錯誤訊息，格式如下：

```jsx
title: {
  type: String,
  required: [true, 'title 為必填']
}
```

### 🍁 **default**

- 若有資料未填寫，也可以設定此資料的預設值

```jsx
title: {
  type: String,
  default: '未命名的文章'
}
```

 **通常 required 與 default 不會同時使用**

### 🍁 **select**

- 若有資料欄位希望可以被保護，不顯示出來，可以加入 select 設定例如：若有涉及使用者相關個資 password、email … 等等，都會建議加入 `select: false` 不將資料回傳給前端

```jsx
password: {
  type: String,
  select: false
}
```

### 🍁 **enum**

- 若此資料設定型別為 `String` 或 `Number`，可以設定 `enum` 指定需為哪些值以字串為例，若 author 需為 Amy、Bob 或 Cody 其中之一，可以設定為以下：

```jsx
author: {
  type: String,
  enum: ['Amy','Bob','Cody']
}
```

### **參考資源**

- [Mongoose v6.2.10: Schemas](https://mongoosejs.com/docs/guide.html)
- [Mongoose v6.2.10: SchemaTypes](https://mongoosejs.com/docs/schematypes.html)
- 課程影音「Mongoose NPM 教學」（可看到 Mongoose 新增 Model 流程）

---

### ****Mongoose 新增 Model 流程****

![2023-03-29 23 45 57.png](Mongoose%20b4e20f7aeb434839a127626b950ca9fd/2023-03-29_23_45_57.png)

1. 建立 Model 寫法如下

```jsx
const roomSchema = new mongoose.Schema({ 
  name: String, 
  price: {
    type: Number,
    required: [true, '價格必填']
  },
  rating: Number
});
// 建立 Model
const Room = mongoose.model('Room', roomSchema);
```

- `mongoose.model()` 第一個參數為 Collection 的名稱，第二個參數帶入 Schema

其中需注意第一個參數 Collection 的名稱，Mongoose 會自動視為小寫開頭及改為複數（結尾加 s）因此 `Room` Model 實際上是連接至名稱為 `rooms` 的 Collection

接著可以使用 Model 新增 document

---

1. ****Mongoose 新增 :**** 建立一筆資料到 Model 中
- 流程解析:
    1. 新增一筆 { name: 'Silence' } 的資料，檢查是否符合 ‘string’，如果符合就會 save() 以及跑 then()

```jsx
const Room = mongoose.model('Room', roomSchema);

const testRoom = new Room({
  name: '總統套房單人房',
  price: 2000,
  rating: 4.5
});
testRoom.save()
  .then(() => {console.log('新增資料成功')})
  .catch((error) => {console.log(error)})
```

- 建立 Model 後，若要使用 Model 新增資料，需先使用 `new` 建立 Room 的實體（instance），一個 Model 的 instance 就是 document
- 產生一個 document 後就可以使用 `save()` 將其儲存到 rooms Collection 中
- 新增 document 也可以使用另一種方式`create()`

```jsx
Room.create({
  name: '總統套房單人房',
  price: 2000,
  rating: 4.5
})
```

- 執行後可以連線至 MongoDB Compass 本地端資料庫 `'mongodb://localhost:27017/test'`（test 可更換為自己建立的資料庫名稱）查看，若新增成功可以看到 rooms collection 中會有剛剛新增的資料

```
  _id: ObjectId('...')
  name: '總統套房單人房'
  price: 2000
  rating: 4.5
  __v: 0
```

- 以上方先前程式碼為範例實作新增資料

```jsx
const http = require("http");
const mongoose = require('mongoose'); //載入 Mongoose NPM

// 連接資料庫 hotel為資料庫名稱
mongoose.connect('mongodb://localhost:27017/hotel')
    .then(()=>{
        console.log('資料庫連線成功')
    })
    .catch((error)=>{
        console.log(error);
    });

// 建立一個 Schema ，設定傳入資料要符合的格式
const roomSchema = {
		name: String,
		price:{
			type: Number,
			required: [true,"價格為必填"]
		},
		rating: Number
}

// 建立一個 Model，通常命名的第一個開頭會大寫
const Room = mongoose.model('Room', roomSchema);
// 進入 Mongoose 之後，會自動轉換 Room > rooms
// 1. 開頭字會自動轉成小寫 
// 2. 會在結尾加上 s 

// 新增一筆資料
const testRoom = new Room(
	{
		name: "豪華總統套房",
		price: 2000,
		rating: 4.5
	}
)
// 寫入到資料庫
testRoom.save()
		.then(()=>{
				console.log("新增資料成功")
		})
		.catch(error => {
				console.log(error);
        console.log(error.errors.price.properties.message); 
				//若 price 傳入的格式不是 Number ,會顯示 價格未填
		})

const requestListener = (req,res)=>{
    console.log(req.url);
    res.end();
}

const server = http.createServer(requestListener);
server.listen(3005);
```

### ****移除欄位 __v 方法****

```jsx
//原始寫法
// 建立一個 Schema ，設定傳入資料要符合的格式
const roomSchema = {
		name: String,
		price:{
			type: Number,
			required: [true,"價格為必填"]
		},
		rating: Number
}

//更改寫法
const roomSchema = new mongoose.Schema(
		{
			name: String,
			price:{
				type: Number,
				required: [true,"價格為必填"]
			},
			rating: Number,
			createdAt: {
				type: Date,
				defaule: Date.now,
				select: false //可隱藏此筆資料，不會出現在前台
			}
		},
		{
			versionKey: false, // 移除欄位 __v 方法
			collection: 'room', //collection 固定名稱，後面不加上 s 方法
		}
)
```

新增 createdAt 建立時間作法

![2023-03-30 00 46 22.png](Mongoose%20b4e20f7aeb434839a127626b950ca9fd/2023-03-30_00_46_22.png)

### ****另一種新增 Model 方法 create()****

> create ( ) 等於 new + save ( ) 使程式碼更簡短
create 可直接操控 Model, 而不會新增一個實體出來
> 

```jsx
Tank.create({ size: 'small' }, function(err, small) {
  if (err) return handleError(err);
  // saved!
});

// or, for inserting large batches of documents
Tank.insertMany([{ size: 'small' }], function(err) {

});
```

- 實作範例

```jsx
const Room = mongoose.model('Room', roomSchema);
Room.create(
		{
				name: String,
				price:{
					type: Number,
					required: [true,"價格為必填"]
				},
				rating: Number
		}
).then(()=>console.log("資料寫入成功"))
.catch(error => { console.log(error.errors) })
```

### **Schema 補充**

### **Schema Options**

建立 Schema 時，Mongoose 也有提供一些可調整的設定

```jsx
new mongoose.Schema({..}, options);
```

在 `Schema()` 中第一個參數放 Schema，第二個參數可以調整設定可以參考[文件說明](https://mongoosejs.com/docs/guide.html#options)查看可調整的 options

### **versionKey**

新增 document 時，預設都會在 document 中加上 `__v: 0`，若不需要加上此設定的話，可以設定 `versionKey: false` 將 versionKey 移除

```jsx
new mongoose.Schema({..}, { versionKey: false });
```

### **collection**

Mongoose 預設會將 model 連接的 collection 的名稱轉為全小寫，並以複數呈現，例如

```jsx
const User = mongoose.model('User', userSchema);
```

`'User'` 會被視為 **users**，若是需要不同的 collection 名稱，可以透過 `{ collection: '...' })` 更改

```jsx
new mongoose.Schema({..}, { collection: 'data' });
```

上方設定會將 collection 名稱改為 `data`，若是 `mongoose.model('Test', Schema);` 設定不同的 collection 名稱，仍然會以 `{ collection: 'data' }` 為主

### **timestamps**

可以透過 `{ timestamps: true }` 為每筆新增的 document 加上 `createdAt` 和 `updatedAt` 欄位也可以透過 `{ timestamps: { createdAt: 'created_at' }, { updatedAt: 'updated_at' } }` 自定義 `createdAt` 和 `updatedAt` 欄位

因設定 timestamps 預設會同時加入 `createdAt` 和 `updatedAt`，若只想加入其中一個欄位，則可以將欄位加在 Schema 中

```jsx
new mongoose.Schema({
  ...
  createdAt: {
   type: Date,
   default: Date.now
 }
});
```

若不希望在前端顯示資料建立時間也可以加入 `select: false` 設定

```jsx
new mongoose.Schema({
 ...
 createdAt: {
   type: Date,
   default: Date.now,
   select: false
 }
});
```

---

### M****odel export 模組化 (把檔案拆分)****

### **拆分步驟**

1. 在專案中建立 models 資料夾
2. 分別依 Collection 建立檔案，如：`posts.js`、`users.js`…等等
3. 因 Schema、Model 建立都需要 Mongoose 套件，因此需記得分別在 `posts.js`、`users.js` 引入 Mongoose 套件
4. 將 Schema、Model 拆出來

```jsx
const postSchema = new mongoose.Schema(
  ...
);
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
```

- 接著引入 models 資料夾中的 Model 到 server.js，即可直接針對 Model 操作新增、查詢、修改、刪除資料註：引入 Model 時通常變數會使用大寫開頭，例如 Post、User，即可使用 `Post.create(...)` 等方式直接針對 Post 操作

---

### 範例 :

- 新增一個 models 資料夾，並新增一支 room.js 檔案

```jsx
const mongoose = require("mongoose"); //載入 mongoose
const roomSchema = new mongoose.Schema(
		{
			name: String,
			price:{
				type: Number,
				required: [true,"價格為必填"]
			},
			rating: Number,
			createdAt: {
				type: Date,
				defaule: Date.now,
				select: false //可隱藏此筆資料，不會出現在前台
			}
		},
		{
			versionKey: false, // 移除欄位 __v 方法
			collection: 'room', //collection 固定名稱，後面不加上 s 方法
		}
)
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
```

- 在 servers.js 導入 room.js 作法

```jsx
const Room = require("./models/room");
```

### ****Mongoose 修改／刪除****

針對 Model 修改、刪除有多個方式（可參考[文件](https://mongoosejs.com/docs/api/model.html)），在此列出其中幾個方式

### **Mongoose 修改**

### **findByIdAndUpdate()**

修改(更新)單筆 ID document寫法為：

```jsx
const Room = mongoose.model('Room', roomSchema);
// 修改特定 Id 的 document
Room.findByIdAndUpdate("621e45063ff3c8af575a7498", {
  "name": "海景雙人房"
}) // id, update

```

需分別帶入參數 id，以及需修改的欄位

### **updateOne()**

修改單筆的特定條件之 document

```jsx
const Room = mongoose.model('Room', roomSchema);
// 修改特定條件的第一筆 document
Room.updateOne(
  {
    "name": "海景雙人房"
  }, {
    "price": 4500
})

```

也可使用 **updateMany()** 修改多筆 documents

### **Mongoose 刪除**

### **deleteMany()**

```jsx
// 刪除所有 rooms collection 中的 documents
Room.deleteMany({})

// 刪除符合特定條件的多個 documents
Room.deleteMany({rating: {$lt: 3}})

```

### **findByIdAndDelete()**

```jsx
// 刪除特定 ID 的 documents
Room.findByIdAndDelete("621e45063ff3c8af575a7498") // id

```

帶入參數 ID，為 `findOneAndDelete({_id: id})` 的簡寫

### **參考資源**

- [Mongoose v6.2.10: Model](https://mongoosejs.com/docs/api/model.html)

課程影音

- 「deleteMany() 刪除全部房型」
- 「刪除單筆 findByIdAndDelete()、更新單筆 findByIdAndUpdate()」

---

## **常見 Mongoose 指令**

### **連線語法**

```jsx
const http = require('http');
const mongoose = require('mongoose');
mongoose
.connect("mongodb://localhost:27017/testPost")
.then(() => console.log('資料庫連接成功'));
// schema 開始

// schema 結束
const requestListener = async(req, res)=>{
    res.end();
}
const server = http.createServer(requestListener);
server.listen(3000);
```

> mongodb://localhost:27017/posts
> 

### **建立 Schema**

```jsx
const postSchema = new mongoose.Schema(
    {
      content: {
        type: String,
        required: [true, 'Content 未填寫']
      },
      image: {
        type:String,
        default:""
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        select: false
      },
      name: {
          type: String,
          required: [true, '貼文姓名未填寫']
      },
      likes: {
          type:Number,
          default:0
        }
    }
);
const Post = mongoose.model('Post', postSchema);
const init = async()=>{
        const AllPost =  await Post.find();
        console.log(AllPost)
    }
init();
```

### **CURD 語法**

- 新增：[Model.create()](https://mongoosejs.com/docs/api/model.html#model_Model.create)
- 刪除：[Model.findByIdAndDelete()](https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndDelete)
- 更新：[Model.findByIdAndUpdate()](https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate)
- 查詢：[Model.find()](https://mongoosejs.com/docs/api/model.html#model_Model.find)

```jsx
await Post.findByIdAndUpdate(id,editContent) // 更新單筆
await Post.deleteMany({}); //刪除全部
await Post.findByIdAndDelete(id); // 刪除單筆
```

- 完整 Code
    
    ```jsx
    const http = require('http');
    const mongoose = require('mongoose');
    mongoose
    .connect("mongodb://localhost:27017/testPost")
    .then(() => console.log('資料庫連接成功'));
    
    const postSchema = new mongoose.Schema(
        {
          content: {
            type: String,
            required: [true, 'Content 未填寫']
          },
          image: {
            type:String,
            default:""
          },
          createdAt: {
            type: Date,
            default: Date.now(),
            select: false
          },
          name: {
              type: String,
              required: [true, '貼文姓名未填寫']
          },
          likes: {
              type:Number,
              default:0
            }
        }
    );
    const Post = mongoose.model('post', postSchema);
    
    const requestListener = async(req, res)=>{
        const headers = {
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
            'Content-Type': 'application/json'
        }
        let body = "";
        req.on('data', chunk=>{
            body+=chunk;
        })
        
        if(req.url=="/posts" && req.method == "GET"){
            const post = await Post.find();
            res.writeHead(200,headers);
            res.write(JSON.stringify({
                "status": "success",
                post
            }));
            res.end();
        }else if(req.url=="/posts" && req.method == "POST"){
            req.on('end',async()=>{
                try{
                    const data = JSON.parse(body);
                    if(data.content !== undefined){
                        const newPost = await Post.create(
                            {
                                name: data.name,
                                content: data.content,
                            }
                        );
                        res.writeHead(200,headers);
                        res.write(JSON.stringify({
                            "status": "success",
                            "data": newPost,
                        }));
                        res.end();
                        
                    }else{
                        res.writeHead(400,headers);
                        res.write(JSON.stringify({
                            "status": "false",
                            "message": "欄位未填寫正確，或無此 todo ID",
                        }));
                        res.end();
                    }
                }catch(error){
                    res.writeHead(400,headers);
                    res.write(JSON.stringify({
                        "status": "false",
                        "message": error,
                    }));
                    res.end();
                }
            })
        }else if(req.url.startsWith("/posts/") && req.method=="DELETE"){
            const id = req.url.split('/').pop();
            await Post.findByIdAndDelete(id);
            res.writeHead(200,headers);
            res.write(JSON.stringify({
                "status": "success",
                "data": null,
            }));
            res.end();
        }else if(req.method == "OPTIONS"){
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
    server.listen(3000);
    ```
    

## **Render 部署 Node 伺服器**

- [Render 伺服器部署 Node.js](https://israynotarray.com/other/20221213/3036227586/)

## **Callback 介紹**

請寫一篇部落格，解釋何謂 **callback function**，加分題是講解 express middleware 如何透過 callback function 實現

- [Genos - https://stark920.github.io/2022/04/17/JScallback/](https://stark920.github.io/2022/04/17/JScallback/)
- [邱繼緯（小麥）0.5本 - 了解 JavaScript 中的 callback function](https://ayugioh2003.github.io/2022/04/callback-function/)
- [Han Lai 0.5本 - 淺談 JavaScript Callback Function](https://hackmd.io/@laihan/S1nTlwY49)
- [Pon - 0.5本 - 回呼函式(callback function)](https://www.notion.so/callback-function-da5ef9fa618b437384e622e19b2d97ea)

## **Mock API 介紹**

請寫一篇部落格，講解你跟後端合作的時候，用哪個 Mock API 服務，造福大家

- [Albert(炸豆腐) - Mock API 身為前端該了解的知識點](https://callum.hashnode.dev/mock-api)
- [joe.chang - 別等了！用Mock Service Worker來產生Mock API吧！](https://medium.com/coding-hot-pot/%E5%88%A5%E7%AD%89%E4%BA%86-%E7%94%A8mock-service-worker%E4%BE%86%E7%94%A2%E7%94%9Fmock-api%E5%90%A7-f921ab30d5c7)
- [Leo Chuang - 使用Mocks Server快速建立Front-End mock API](https://medium.com/@dennis302218905/%E4%BD%BF%E7%94%A8mocks-server%E5%BF%AB%E9%80%9F%E5%BB%BA%E7%AB%8Bfront-end-mock-api-130a1876832b)
