- students collection
```
{
  "studentName": "Riley Parker",
  "group": "A",
  "score": 83,
  "isPaid": false
},
{
  "studentName": "Brennan Miles",
  "group": "C",
  "score": 72,
  "isPaid": false
},
{
  "studentName": "Mia Diaz",
  "group": "B",
  "score": 98,
  "isPaid": true
},
{
  "studentName": "Caroline morris",
  "group": "B",
  "score": 55,
  "isPaid": false
},
{
  "studentName": "Beverly Stewart",
  "group": "B",
  "score": 60,
  "isPaid": false
}
```

- 題目1 : 指定其中一個 _id ，並將該筆 document 的 group 改為 D
```
db.students.updateOne(
  { _id: ObjectId("5f9b1b5b8b1b5b1b5b1b5b1b") },
  { $set: { group: "D" } }
)
```

- 題目2 : 將 group 為 B 的多筆 document 的 isPaid 改為 true
```
db.students.updateMany(
  { group: "B" },
  { $set: { isPaid: true } }
)
```

- 題目3 : 將 studentName 包含關鍵字 Brennan 的 document 刪除
```
db.students.deleteOne(
  { studentName: /Brennan/ }
)
```
- 題目4 : 將 isPaid 為 true 的多筆 document 刪除

```
db.students.deleteMany(
  { isPaid: true }
)
```