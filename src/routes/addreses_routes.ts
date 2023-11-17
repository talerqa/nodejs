import {Request, Response, Router} from "express";

const addressArray = [{id: 1, value: 'Nezalejnosti'}, {id: 2, title: 'Selickaga'}]

export const addressesRoute = Router({})

addressesRoute.get('/', (req: Request, res: Response) => {
  res.send(addressArray)
})
addressesRoute.get('/:id', (req: Request, res: Response) => {
  const address = addressArray.find(product => product.id === +req.params.id)
  if (address) {
    res.send(address)
  } else {
    res.send(404)
  }
})

