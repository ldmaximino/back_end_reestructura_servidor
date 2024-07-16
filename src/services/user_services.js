import Services from "./class.services.js";
import { hashearPass, verifyPassHasheada } from "../utils.js";
import persistence from "../daos/persistence.js";
const { userDao } = persistence;

export default class UserService extends Services {

  constructor() {
    super(userDao);
  }

  async getUserByEmail(email) {
    try {
      return await userDao.getUserByEmail(email);      
    } catch (error) {
      throw new Error(error);
    }
  };

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await userDao.getUserByEmail(email);
      if (!existUser) {
        const newUser = await userDao.register({
          ...user,
          password: hashearPass(password),
        });
        return newUser;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  async login(user) {
    try {
      let userExist = "";
      const { email, password } = user;
      if (email.toLowerCase() === "admincoder@coder.com" && password === "adminCod3r123") {
        userExist = {
          ...user,
          first_name: "Coderhouse",
          last_name: "",
          role: "admin",
        };
      } else {
        userExist = await userDao.getUserByEmail(email);
        if (!userExist) return null;
        const passValid = verifyPassHasheada(password, userExist.password);
        if (!passValid) return null;
      }
      return userExist;
    } catch (error) {
      throw new Error(error);
    }
  };
}
