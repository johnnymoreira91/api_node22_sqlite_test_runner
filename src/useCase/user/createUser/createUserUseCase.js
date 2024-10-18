import User from "../../../infra/database/models/User.js";

/**
 * Function to create a new user
 * @param {{
 *  name: string
 *  email: string
 *  password: string
 * }} data 
 * @returns {Promise<User>}
 */
export async function createUserUseCase(data) {
  const createdUser = await User.create(data);
  return createdUser;
}
