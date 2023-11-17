import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import {productsRoute} from "./routes/products_routes";
import {addressesRoute} from "./routes/addreses_routes";

const app = express()
const port = process.env.PORT || 5000

app.get('/', (req: Request, res: Response) => {
  let helloMessage = '!!!!!!!'
  res.send(helloMessage)
})


// const parserMiddleWare = bodyParser({})
// app.use(parserMiddleWare)
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/products', productsRoute)
app.use('/addresses', addressesRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})