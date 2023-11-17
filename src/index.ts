import express, {Request, Response} from 'express'
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 5000

app.get('/', (req: Request, res: Response) => {
  let helloMessage = '!!!!!!!'
  res.send(helloMessage)
})

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
const address = [{id: 1, value: 'Nezalejnosti'}, {id: 2, title: 'Selickaga'}]

const parserMiddleWare = bodyParser({})
app.use(parserMiddleWare)

app.get('/products/', (req: Request, res: Response) => {
  const title = req.query.title as string

  if (req.query.title) {
    res.send(products.filter(p => p.title.indexOf(title) > -1))
  } else {
    res.send(products)

  }
})
app.get('/products/:id', (req: Request, res: Response) => {
  const product = products.find(product => product.id === +req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.send(404)
  }
})
app.delete('/products/:id', (req: Request, res: Response) => {

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1)
      res.send(204)
      return
    }
  }

  res.send(404)
})
app.post('/products', (req: Request, res: Response) => {
  const newProduct = {id: +new Date(), title: req.body.title}
  products.push(newProduct)
  res.status(201).send(newProduct)
})
app.put('/products/:id', (req: Request, res: Response) => {
  const product = products.find(product => product.id === +req.params.id)
  if (product) {
    product.title = req.body.title
    res.status(200).send(product)
  } else {
    res.send(404)
  }
})


app.get('/products/:id', (req: Request, res: Response) => {
  const product = products.find(product => product.id === +req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.send(404)
  }
})

app.get('/address', (req: Request, res: Response) => {
  res.send(address)
})

app.get('/address/:id', (req: Request, res: Response) => {
  const adress = address.find(product => product.id === +req.params.id)
  if (adress) {
    res.send(adress)
  } else {
    res.send(404)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})