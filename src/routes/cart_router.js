//Third party imports
import { Router } from "express";
import passport from "passport";

//Local imports
import CartController from "../controllers/cart_controller.js";

const controller = new CartController();
const router = Router();

router.get("/", passport.authenticate("current"), controller.getAllCarts);

router.get("/:cid", passport.authenticate("current"), controller.getCartById);

router.post("/", passport.authenticate("current"), controller.createCart);

router.post(
  "/:cid/product/:pid",
  passport.authenticate("current"),
  controller.saveProductToCart
);

router.put(
  "/:cid",
  passport.authenticate("current"),
  controller.updateCartWithProducts
);

router.put(
  "/:cid/product/:pid",
  passport.authenticate("current"),
  controller.updateProductQuantity
);

router.delete(
  "/:cid/product/:pid",
  passport.authenticate("current"),
  controller.deleteProductFromCart
);

router.delete(
  "/:cid",
  passport.authenticate("current"),
  controller.deleteAllProductsFromCart
);

export default router;
