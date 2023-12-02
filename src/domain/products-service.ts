import {productsRepositories,} from "../repositories/products-repositories";
import {ProductType} from "../repositories/store";

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
  async createProduct(description: string,
                      price: number,
                      value: string,
                      title: string,
                      img: string,
                      count: number): Promise<ProductType[]> {
    const newProduct = {
      id: +new Date(), description,
      price,
      value,
      title,
      img,
      count
    }
    return await productsRepositories.createProduct(newProduct)
  },
  async updateProduct({id, description,
                        price,
                        value,
                        title,
                        img,
                        count}: ProductType): Promise<boolean> {
    return await productsRepositories.updateProduct({id,description,
      price,
      value,
      title,
      img,
      count
    })
  },
  async deleteProduct(id: number) {
    return await productsRepositories.deleteProduct(id)
  }
}