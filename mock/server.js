/**
 * express监听端口，如有符合路径的请求发来，使用mock模拟出合法数据，然后响应请求
 *
 * 使用express作为模拟的web api服务器，mock作为模拟数据生成器
 * 以便前端开发时，可以随时准备好接口数据，方便页面调试，而不是干等后端提供可用接口和API文档
 */
import express from 'express'
import Mock from 'mockjs'

// 初始化express
const app = express()

// mock模拟数据
const mockData = Mock.mock({
  status: 200,
  hello: 'world',
})

// express中间件，解决跨域问题
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header("Access-Control-Allow-Credentials", true)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
  // 不要忘记调用下一个中间件函数，否则express无法继续后续动作比如监听端口
  next()
})

// express设置返回数据并做出对应类型（比如GET和POST）的响应
app.get('/', (req, res) => {
  // 返回的数据由mock提供
  res.json(mockData)
})

// express监听端口
app.listen(8090, () => {
  console.log('监听端口8090')
})
