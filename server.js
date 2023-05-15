import createServer from "http"
import parse from "url"
import next from "next"

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname === "/a") {
        await app.render(req, res, "/a", query)
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Error occurred handling", req.url, err)
      res.statusCode = 500
      res.end("internal server error")
    }
  }).listen(port, err => {
    if (err) throw err
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
