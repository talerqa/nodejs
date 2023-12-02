import {products, ProductType} from "./store";


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
  async findProductById(id: number): Promise<ProductType | undefined> {
    return products.find(product => product.id === id)
  },
  async createProduct(newProduct: ProductType): Promise<ProductType[]> {

    products.push(newProduct)
    return products
  },

  async updateProduct({
                        id, description,
                        price,
                        value,
                        title,
                        img,
                        count
                      }: ProductType): Promise<boolean> {
    const product = products.find(product => product.id === id)
    if (product) {
      product.description = description
      product.price = price
      product.title = title
      product.value = value
      product.img = img
      product.count = count
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