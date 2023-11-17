import {Request, Response, Router} from "express";

const address = [{id: 1, value: 'Nezalejnosti'}, {id: 2, title: 'Selickaga'}]

export const addressesRoute = Router({})

addressesRoute.get('/', (req: Request, res: Response) => {
  res.send(address)
})
addressesRoute.get('/:id', (req: Request, res: Response) => {
  const adress = address.find(product => product.id === +req.params.id)
  if (adress) {
    res.send(adress)
  } else {
    res.send(404)
  }
})

