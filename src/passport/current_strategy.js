//Third party imports
import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import "dotenv/config";

//Local imports
import UserService from "../services/user_services.js";

const userService = new UserService();

const verifyToken = async (jwt_payload, done) => {
  const user = await userService.getById(jwt_payload.userId);
  if (!user) return done(null, false);
  return done(null, user);
};

const cookieExtractor = (req) => {
  return req.cookies.token;
};

const strategyConfig = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use("current", new jwtStrategy(strategyConfig, verifyToken));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await services.getUserById(id);
    return done(null, user);
  } catch (error) {
    done(error);
  }
});
