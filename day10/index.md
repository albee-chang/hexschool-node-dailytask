嘗試將此檔案的 Model 拆分到 models 資料夾，並引入 server.js 做使用
並附上拆分後的 models 程式碼以及將 models 引入 server.js 的程式碼

- models 資料夾 - posts.js
```js
const mongoose = require('mongoose');
const postsSchema = new mongoose.Schema({
  title: String,
  content: String,
});

module.exports = mongoose.model('posts', postsSchema);
```

- server.js
```js
const Post = require('./models/posts');
```