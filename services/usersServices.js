import { User } from "../schemas/usersSchema.js";

export async function addUser(email, password, subscription) {
  return User.create({ email, password, subscription });
}

export async function findUserByEmail(email) {
  return User.find({ email });
}
