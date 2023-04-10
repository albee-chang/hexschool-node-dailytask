const Drink = mongoose.model('Drink', drinkSchema);

const newDrink = new Drink({
  product: '鮮奶茶',
  price: 55,
  sugar: '微糖'
});
newDrink.save()
  .then(() => {console.log('新增資料成功')})
  .catch((error) => {console.log(error)})
  
// 或
// create () 等於 new + save () 使程式碼更簡短
Drink.create({
  product: '鮮奶茶',
  price: 55,
  sugar: '微糖'
})