參考最終作業設計稿頁面，設計當使用者造訪以下頁面（GET）時的路由， response 可先回傳一段簡單的文字即可

1.登入
2.註冊
3.全體動態牆
4.個人牆
5.個人追蹤名單

```js
app.get('/login', (req, res) => {
  res.send('歡迎來到登入頁')
})
app.get('/register', (req, res) => {
  res.send('歡迎來到註冊頁')
})
app.get('/post', (req, res) => {
  res.send('歡迎來到全體動態牆')
})
app.get('/user/:id', (req, res) => {
  res.send(`歡迎來到 ${ id } 個人牆`)
})
app.get(`/user/:id/following`, (req, res) => {
  res.send('${id} 追蹤名單')
})
```
