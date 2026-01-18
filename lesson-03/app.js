import http from 'http'
import fs from 'fs'
import url from 'url'

const server = http.createServer((req, res) => {

    // Ignore browser devtools request
    if (req.url === '/.well-known/appspecific/com.chrome.devtools.json') {
        return res.end()
    }

    // Log request
    const log = `${Date.now()} ${req.url} Request Received!\n`
    fs.appendFile('./log.txt', log, () => { })

    // Base path for HTML files
    let filePath = './views'

    // Set response header
    res.setHeader('Content-Type', 'text/html')

    // Parse URL
    const parsedUrl = url.parse(req.url, true)

    switch (parsedUrl.pathname) {
        case '/':
            filePath += '/home.html'
            res.statusCode = 200
            break

        case '/about':
            filePath += '/about.html'
            res.statusCode = 200
            break

        case '/search':
            res.statusCode = 200
            res.end(`Search Result: ${parsedUrl.query.q}`)
            return

        default:
            filePath += '/404.html'
            res.statusCode = 404
    }

    // Read and send file
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.end('<h1>Internal Server Error</h1>')
            return
        }
        res.end(data)
    })
})

const port = 3000
server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
