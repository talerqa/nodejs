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
  res.send(products)
})
productsRoute.get('/', async (req: Request, res: Response) => {
  let foundProducts = await productService.findProducts((req.query.title?.toString()));
  res.send(foundProducts)
})
productsRoute.post('/',
  titleValidation,
  bioValidation,
  async (req: Request, res: Response) => {
    handlerError(req, res)
    const newProduct = await productService.createProduct(req.body.title, req.body.bio)
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
      bio: req.body.bio,
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

