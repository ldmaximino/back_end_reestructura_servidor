//Local imports
import Controllers from "./class.controller.js";
import UserService from "../services/user_services.js";
import { generateToken } from "../middlewares/jwt.js";

const userService = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(userService);
  }

  async registerResponse(req, res, next) {
    try {
      return res.redirect("/user_registered");
    } catch (error) {
      next(error);
    }
  }

  async loginJwt(req, res, next) {
    try {
      const user = await userService.login(req.body);
      if (!user) return res.redirect("/user_login_error");
      const token = generateToken(user);
      res.cookie("token", token, { httpOnly: true });
      return res.redirect("/products");
    } catch (error) {
      next(error);
    }
  }
}
