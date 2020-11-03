const crypto = require('crypto')
const fetch = require('node-fetch')
const KEY = 'maxinwei'
const BODY = 'maxinwei'
fetch('http://localhost:3000/webhook', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'x-hub-signature': 'sha1=' + crypto.createHmac('sha1', KEY).update(BODY).digest('hex')
  },
  body: BODY
}).then(res => res.text()).then(res => console.log(res))