import {Request, Response, Router} from "express";
import {addressesRepository} from "../repositories/addresses-repositories";


export const addressesRoute = Router({})

addressesRoute.get('/', async (req: Request, res: Response) => {
  const addresses = await addressesRepository.getAddresses()
  res.send(addresses)
})
addressesRoute.get('/:id', async (req: Request, res: Response) => {
  const address = await addressesRepository.getAddressById(+req.params.id)
  if (address) {
    res.send(address)
  } else {
    res.send(404)
  }
})

