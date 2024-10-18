import { IncomingMessage, ServerResponse } from 'node:http'
import { once } from 'node:events';
import { createUserUseCase } from './createUserUseCase.js';

/**
 * Create User Route
 * @param {IncomingMessage} req 
 * @param {ServerResponse<IncomingMessage>} res 
 * @returns 
 */
export async function createUserRoute(req, res) {
  try {
    const { name, email, password } = JSON.parse(await once(req, 'data'));

    const user = await createUserUseCase({ name, email, password });

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(user.toJson()));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      message: error.message
    }));
  }
}