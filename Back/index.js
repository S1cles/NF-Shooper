import express from 'express'
import data from './data.js'

const app = express()
const port = process.env.PORT || 5001

app.get('/api/products', (req, res) => { res.send(data.products) })
//http://localhost:5001/api/products

app.get(`/api/products/:slug`, (req, res) => {
    const product = data.products.find(x => x.slug === req.params.slug)
    product ? res.send(product) : res.status(404).send({ message: `Product ${product} doesn't exist` })
    res.send(data.products)
})

app.listen(port, () => {
    console.log('server http://localhost:' + port)
})
