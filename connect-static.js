const url = require('url')

const path = require('path')

const connect = require('connect')

const app = connect()

// 静态后缀名
const tillExt = ['.js', '.css', '.html']

// 第一中间件
app.use((req, res, next) => {
    // 获取请求的路由 localhost://foo/bar.js
    // 根据获取路由的后缀名来定义是静态文件请求的，
    const urlObj = url.parse(req.url)

    // 获取请求路由的后缀名
    const extname = path.extname(urlObj.pathname)
    console.log('请求', extname);

    // 判断下获取路由的后缀名是否是包含在自己定义的数组中
    if (tillExt.includes(extname)) {
        res.setHeader('Content-Type','text/plain;charset=utf-8')
        return res.end('目前是静态文件的请求')
    } 
    next()
})

// 第二个中间件
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.write('这是一个动态的请求')
    res.end()
})

// 监听一个指定的端口 3080
app.listen(3080, () => {
    console.log('server is runing 3080');
})

