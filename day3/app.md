- 題目 1 : 依以下格式新增一筆 document 到 students collection
```
db.students.insertOne({
  "studentName": "Riley Parker",
  "group": "A",
  "score": 83,
  "isPaid": false
})
```
- 題目 2 : 依以下格式新增多筆 document 到 students collection
```
db.students.insertMany([
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
])
```

- 題目 3 : 查詢 students collection 中的所有資料
```
db.students.find();

```

- 題目 4 : 查詢 students collection 中 group 為 B 的所有資料，使用 { <field>: <value> } 設定符合的項目
```
db.students.find({group:"B"});
```

- 題目 5 : 查詢 students collection 中 score 分數在 60 分以上的的資料
```
db.students.find({ score:{$gt:60} });
```

- 題目 6 : 查詢 students collection 中符合分數在 60 分以下或是 group 為 B 的資料 score
```
db.students.find({ $or:[{ score: {$lt:60} } , { group:"B" } ]});
```