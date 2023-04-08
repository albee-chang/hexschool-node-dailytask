const checkScore = new Promise((resolve,reject) => {
    /* 回傳一個 Promise，並執行以下非同步操作*/
    const score = Math.round(Math.random() * 100);
    /* 判斷流程請嘗試使用 setTimeout() 執行 */
    if(score >= 60) {
        resolve(score); // 執行實現方法
    } else {
        reject("不及格"); // 執行拒絕方法
    }
  });

  checkScore.then(data => console.log(data))
  .catch(err => console.log(err));