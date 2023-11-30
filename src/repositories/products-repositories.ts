export type ProductType = { id: number, title: string, bio: string }

const products: ProductType[] = [{id: 1, title: 'tomato', bio: ''}, {
  id: 2,
  title: 'orange',
  bio: ''
}]

export const productsRepositories = {
  async getAllProducts() {
    return products
  },
  async findProducts(title: string | null | undefined): Promise<ProductType[]> {
    if (title) {
      return products.filter(p => p.title.indexOf(title) > -1)
    } else {
      return products
    }
  },
  async createProduct(title: string, bio: string): Promise<ProductType[]> {
    const newProduct = {id: +new Date(), title, bio}
    products.push(newProduct)
    return products
  },
  async findProductById(id: number): Promise<ProductType | undefined> {
    const product = products.find(product => product.id === id)
    if (product) {
      return product
    }
  },
  async updateProduct({id, title, bio}: ProductType): Promise<boolean> {
    const product = products.find(product => product.id === id)
    if (product) {
      product.title = title
      product.bio = bio
      return true
    } else {
      return false
    }
  },
  async deleteProduct(id: number) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1)
        return true
      }
    }
    return false
  }

}