import ProductDaoMongoDB from "./mongodb/product_dao.js";
import ProductDaoFS from "./filesystem/product_dao.js";
import CartDaoMongoDB from "./mongodb/cart_dao.js";
import CartDaoFS from "./filesystem/cart_dao.js";
import UserDaoMongoDB from "./mongodb/user_dao.js";
import { initMongoDB } from "../db/connection.js";
import "dotenv/config";

let productDao = null;
let userDao = null;
let cartDao = null;

let persistence = process.env.PERSISTENCE

switch (persistence) {
    case 'fs':
        productDao = new ProductDaoFS("../data/products.json");
        cartDao = new CartDaoFS("../data/carts.json");
        break;
    case 'mongodb':
        initMongoDB();
        userDao = new UserDaoMongoDB();
        productDao = new ProductDaoMongoDB();
        cartDao = new CartDaoMongoDB();
        break;
    default:
        productDao = new ProductDaoFS('./src/daos/filesystem/products.json');
        cartDao = new CartDaoFS("../data/carts.json");
    break;
}

export default { userDao, productDao, cartDao };