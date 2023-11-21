const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRepositories = {
  getAllProducts() {
    return products
  },
  findProducts(title: string | null | undefined) {
    if (title) {
      return products.filter(p => p.title.indexOf(title) > -1)
    } else {
      return products
    }
  },
  createProduct(title: string) {
    const newProduct = {id: +new Date(), title}
    products.push(newProduct)
    return products
  },
  findProductById(id: number) {
    return products.find(product => product.id === id)
  },
  updateProduct({id, title}: { id: number, title: string }) {
    const product = products.find(product => product.id === id)
    if (product) {
      product.title = title
      return true
    } else {
      return false
    }
  },
  deleteProduct(id: number) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1)
        return true
      }
    }
    return false
  }

}