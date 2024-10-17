import User from "../../../infra/database/models/User.js";

/**
 * List all users with pagination
 * @param {number} page 
 * @param {number} pageSize 
 * @returns 
 */
export async function listUsersUseCase(page, pageSize) {
  const users = await User.list();
  return users;
}