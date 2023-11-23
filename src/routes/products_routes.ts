import {Request, Response, Router} from "express";
import {productsRepositories} from "../repositories/products-repositories";
import {
  bioValidation,
  handlerError,
  titleValidation
} from "../middlwares/validation-middlwares";


export const productsRoute = Router({})

productsRoute.get('/', (req: Request, res: Response) => {
  let products = productsRepositories.getAllProducts();
  res.send(products)
})
productsRoute.get('/', (req: Request, res: Response) => {
  let foundProducts = productsRepositories.findProducts((req.query.title?.toString()));
  res.send(foundProducts)
})
productsRoute.post('/',
  titleValidation,
  bioValidation,
  (req: Request, res: Response) => {
    handlerError(req, res)

    const newProduct = productsRepositories.createProduct(req.body.title, req.body.bio)
    res.status(201).send(newProduct)
  })
productsRoute.get('/:id', (req: Request, res: Response) => {
  const product = productsRepositories.findProductById(+req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.send(404)
  }
})
productsRoute.put('/:id',
  titleValidation,
  bioValidation,
  (req: Request, res: Response) => {
    handlerError(req, res)

    const isUpdated = productsRepositories.updateProduct({
      id: +req.params.id,
      title: req.body.title,
      bio: req.body.bio,
    })

    if (isUpdated) {
      const product = productsRepositories.findProductById(+req.params.id)
      res.status(200).send(product)
    } else {
      res.send(404)
    }
  })

productsRoute.delete('/:id', (req: Request, res: Response) => {

  const isDeleted = productsRepositories.deleteProduct(+req.params.id)

  if (isDeleted) {
    res.send(204)
  } else {
    res.send(404)
  }
})

