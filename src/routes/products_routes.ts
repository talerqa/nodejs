import {Request, Response, Router} from "express";
import {productService} from '../domain/products-service'
// import {productsRepositories} from "../repositories/products-repositories";
import {
  bioValidation,
  handlerError,
  titleValidation
} from "../middlwares/validation-middlwares";


export const productsRoute = Router({})

productsRoute.get('/', async (req: Request, res: Response) => {
  let products = await productService.getAllProducts();
  let foundProducts = await productService.findProducts(req.query.title?.toString().toLowerCase());

  if (req.query?.title) {
    res.send(foundProducts)
  } else {
    res.send(products)
  }
})
productsRoute.post('/',
  titleValidation,
  bioValidation,
  async (req: Request, res: Response) => {
    handlerError(req, res)
    const newProduct = await productService.createProduct(
      req.body.description,
      req.body.price,
      req.body.value,
      req.body.title,
      req.body.img,
      req.body.count,
    )
    res.status(201).send(newProduct)
  })
productsRoute.get('/:id', async (req: Request, res: Response) => {
  const product = await productService.findProductById(+req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.send(404)
  }
})
productsRoute.put('/:id',
  titleValidation,
  bioValidation,
  async (req: Request, res: Response) => {
    handlerError(req, res)

    const isUpdated = await productService.updateProduct({
      id: +req.params.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      value: req.body.value,
      img: req.body.img,
      count: req.body.count,
    })

    if (isUpdated) {
      const product = await productService.findProductById(+req.params.id)
      res.status(200).send(product)
    } else {
      res.send(404)
    }
  })

productsRoute.delete('/:id', async (req: Request, res: Response) => {

  const isDeleted = await productService.deleteProduct(+req.params.id)

  if (isDeleted) {
    res.send(204)
  } else {
    res.send(404)
  }
})

