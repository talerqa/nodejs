import {Request, Response, Router} from "express";
import {productsRepositories} from "../repositories/products-repositories";
import {
  bioValidation,
  handlerError,
  titleValidation
} from "../middlwares/validation-middlwares";


export const productsRoute = Router({})

productsRoute.get('/', async (req: Request, res: Response) => {
  let products = await productsRepositories.getAllProducts();
  res.send(products)
})
productsRoute.get('/', async (req: Request, res: Response) => {
  let foundProducts = await productsRepositories.findProducts((req.query.title?.toString()));
  res.send(foundProducts)
})
productsRoute.post('/',
  titleValidation,
  bioValidation,
  async (req: Request, res: Response) => {
    handlerError(req, res)
    const newProduct = await productsRepositories.createProduct(req.body.title, req.body.bio)
    res.status(201).send(newProduct)
  })
productsRoute.get('/:id', async (req: Request, res: Response) => {
  const product = await productsRepositories.findProductById(+req.params.id)
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

    const isUpdated = await productsRepositories.updateProduct({
      id: +req.params.id,
      title: req.body.title,
      bio: req.body.bio,
    })

    if (isUpdated) {
      const product = await productsRepositories.findProductById(+req.params.id)
      res.status(200).send(product)
    } else {
      res.send(404)
    }
  })

productsRoute.delete('/:id', async (req: Request, res: Response) => {

  const isDeleted = await productsRepositories.deleteProduct(+req.params.id)

  if (isDeleted) {
    res.send(204)
  } else {
    res.send(404)
  }
})

