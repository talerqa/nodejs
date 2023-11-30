export type AddressType = { id: number, title: string }

const addressArray: AddressType[] = [{id: 1, title: 'Nezalejnosti'}, {
  id: 2,
  title: 'Selickaga'
}]

export const addressesRepository = {
  async getAddresses(): Promise<AddressType[]> {
    return addressArray
  },
  async getAddressById(id: number): Promise<AddressType | undefined> {
    return addressArray.find(product => product.id === id)
  }
}