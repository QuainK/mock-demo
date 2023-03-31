/**
 * express监听端口，如有符合路径的请求发来，使用mock模拟出合法数据，然后响应请求
 *
 * 使用express作为模拟的web api服务器，mock作为模拟数据生成器
 * 以便前端开发时，可以随时准备好接口数据，方便页面调试，而不是干等后端提供可用接口和API文档
 */
import express from 'express'
import mockData from './api/index.js'
// 控制台彩色文本
import chalk from 'chalk'

// express监听的端口号
const expressPort = 3001

// 初始化express
const app = express()

// express中间件，解决跨域问题
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header("Access-Control-Allow-Credentials", true)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
  // 不要忘记调用下一个中间件函数，否则express无法继续后续动作比如监听端口
  next()
})

// 将每个接口数据都用mock模拟，封装好后用express返回响应结果
for (const mockItem of mockData) {
  // 参考express官网文档
  // app.METHOD(url, callback[, callback ...])
  // res.json([body])
  app[mockItem.method || 'get'](mockItem.url, (req, res) => {
    console.log(chalk.blue(`${mockItem.method}请求${mockItem.url}`))
    res.json(mockItem.data)
  })
}

// express监听端口
app.listen(expressPort, () => {
  // 这里的字符串引号是反引号
  console.log(chalk.green(`mock模拟数据接口已开启，监听端口${expressPort}`))
})
