import {Request, Response, Router} from "express";
import {addressesRepository} from "../repositories/addresses-repositories";


export const addressesRoute = Router({})

addressesRoute.get('/', (req: Request, res: Response) => {
   const addresses = addressesRepository.getAddresses()
  res.send(addresses)
})
addressesRoute.get('/:id', (req: Request, res: Response) => {

  const address = addressesRepository.getAddressById(+req.params.id)
  if (address) {
    res.send(address)
  } else {
    res.send(404)
  }
})

