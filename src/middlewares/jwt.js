//Third party imports
import jwt from "jsonwebtoken";
import { TIMETOKEN, SECRET_KEY } from '../config.js';

export const generateToken = (user, time = `${TIMETOKEN}m`) => {
  const payload = {
    userId: user._id,
  };

  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: time,
  });
};
