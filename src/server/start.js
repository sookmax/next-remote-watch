const express = require('express')
const { parse } = require('url')
const reloadController = require('./controllers/reload')

const start = (app) => {
  const nextReloadRouter = express.Router()

  const port = parseInt(process.env.PORT, 10) || 3000

  const handler = app.getRequestHandler()

  const server = express()

  server.use(express.json())

  nextReloadRouter.all('*', (req, res) => reloadController(req, res, app))

  server.use('/__next_reload', nextReloadRouter)

  // handle all other routes with next.js
  server.all('*', (req, res) => handler(req, res, parse(req.url, true)))

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}

module.exports = start
