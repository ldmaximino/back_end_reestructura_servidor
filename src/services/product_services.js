import Services from "./class.services.js";
import persistence from "../daos/persistence.js";
const { productDao } = persistence;

export default class ProductService extends Services {

  constructor() {
    super(productDao);
  }

  async getAllProducts(page, limit, category, stock, sort) {
    try {
      return await this.dao.getAllProducts(
        page,
        limit,
        category,
        stock,
        sort
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductByCode(code) {
    try {
      return await this.dao.getProductByCode(code);
    } catch (error) {
      throw new Error(error);
    }
  }
}
