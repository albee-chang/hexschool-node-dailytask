const express = require('express');
const app = express();
//指定 port，並使用 app 監聽
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
//設定當接收到 GET request 時，回傳 'Hello World!' 文字
app.get('/', (req, res) => {
  res.send('Hello World!')
})
//執行node app.js，並造訪 http://localhost:3000/，若設定成功則會看到頁面出現 Hello World!