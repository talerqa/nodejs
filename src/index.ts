import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import {productsRoute} from "./routes/products_routes";
import {addressesRoute} from "./routes/addreses_routes";

const app = express()
const port = process.env.PORT || 5000

const parserMiddleWare = bodyParser({})

app.use(cors({ credentials: true }))
app.use(parserMiddleWare)

app.get("/", function (request, response) {
  response.send("<h2>Products</h2>");
});

app.use('/products', productsRoute)
app.use('/addresses', addressesRoute)

app.listen(port, () => {
  console.log(port)
})

