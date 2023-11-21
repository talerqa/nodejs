import express from 'express'
import bodyParser from "body-parser";
import {productsRoute} from "./routes/products_routes";
import {addressesRoute} from "./routes/addreses_routes";

const app = express()
const port = process.env.PORT || '5000'

const parserMiddleWare = bodyParser({})
app.use(parserMiddleWare)
app.get("/", function (request, response) {
  response.send("<h2>Привет Express!</h2>");
});

app.use('/products', productsRoute)
app.use('/addresses', addressesRoute)

app.listen( port)