1. 尋找一筆 document 並將 ice 改為 去冰，sugar 改為 半糖
```
drinkSchema.updateOne({name: '紅茶'}, {ice: '去冰', sugar: '半糖'});
```
```
2. 以 ID 尋找一筆 document 並將其刪除
```
drinkSchema.findByIdAndDelete('5e7b5b1b1b9d440000a1b0b1');
```
3. 刪除全部 documents
```
drinkSchema.deleteMany({})
```