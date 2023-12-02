import {
  productsRepositories,
  ProductType
} from "../repositories/products-repositories";

export const productService = {
  async getAllProducts() {
    return productsRepositories.getAllProducts()
  },
  async findProducts(title: string | null | undefined): Promise<ProductType[]> {
    return await productsRepositories.findProducts(title)
  },
  async findProductById(id: number): Promise<ProductType | undefined> {
    return await productsRepositories.findProductById(id)
  },
  async createProduct(title: string, bio: string): Promise<ProductType[]> {
    const newProduct = {id: +new Date(), title, bio}
    return await productsRepositories.createProduct(newProduct)
  },
  async updateProduct({id, title, bio}: ProductType): Promise<boolean> {
    return await productsRepositories.updateProduct({id, title, bio})
  },
  async deleteProduct(id: number) {
    return await productsRepositories.deleteProduct(id)
  }
}