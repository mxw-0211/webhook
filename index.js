const http = require('http')
const crypto = require('crypto')
const KEY = 'maxinwei'
const app = http.createServer((req, res) => {
  const { method, url } = req
  let bufferArr = []
  if (method === 'POST' && url === '/webhook') {
    let sign = req.headers['x-hub-signature'];
    req.on('data', buffer => {
      bufferArr.push(buffer)
    })
    req.on('end', () => {
      const body = Buffer.concat(bufferArr)
      if (sign === 'sha1=' + crypto.createHmac('sha1', KEY).update(body.toString()).digest('hex')) {
        res.end('ok')
        doSomething()
      }
    })
  } else {
    console.log(req.method, req.url)
  }
})
function doSomething () {

}
app.listen(3000)