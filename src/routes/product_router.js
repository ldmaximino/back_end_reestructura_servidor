//Third party imports
import { Router } from "express";
import passport from "passport";

//Local imports
import { productValidator } from "../middlewares/product_validators.js";
import ProductController from "../controllers/product_controller.js";

const controller = new ProductController();
const router = Router();

router.get("/", passport.authenticate("current"), controller.getAllProducts);

router.get("/:pid", passport.authenticate("current"), controller.getById);

router.post(
  "/",
  passport.authenticate("current"),
  productValidator,
  controller.create
);

router.put(
  "/:pid",
  passport.authenticate("current"),
  productValidator,
  controller.update
);

router.delete("/:pid", passport.authenticate("current"), controller.delete);

export default router;
