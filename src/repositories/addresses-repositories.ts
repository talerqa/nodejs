const addressArray = [{id: 1, value: 'Nezalejnosti'}, {
  id: 2,
  title: 'Selickaga'
}]

export const addressesRepository = {
  getAddresses() {
    return addressArray
  },
  getAddressById(id: number) {
    return addressArray.find(product => product.id === id)
  }
}