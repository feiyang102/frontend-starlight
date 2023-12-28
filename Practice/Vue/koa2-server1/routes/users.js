const router = require('koa-router')()
const User = require("../models/userSchema")

router.prefix('/users')

router.get('/', async function (ctx, next) {
  // ctx.body = 'this is a users response!'
  const res = await User.findOne({
    userName: "admin"
  })
  ctx.body = res;
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
