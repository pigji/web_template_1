const express = require('express')  //express모듈을 가져오는 구문
const app = express() //새로운 express앱을 만듦
const port = 3000 //port 경로(port는 자유롭게 변경해도 된다.)

//express앱에 get메소드를 연결해서 서버에 요청('/' = root 디렉토리)
app.get('/', (req, res) => {
  res.send('Hello World!')  //출력할 문구 입력 -> Hello, World! 출력
})

//listen메소드로 서버를 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})