import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

// __dirname FOR ES MODULE
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'))
})

// 404 Middleware
app.use((req, res) => {
    res.status(404).send('Page Not Found')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
