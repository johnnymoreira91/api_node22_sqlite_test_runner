import { IncomingMessage, ServerResponse } from 'node:http'
import { listUsersUseCase } from './listUsersUseCase.js';

/**
 * List users Check Route
 * @param {IncomingMessage} req 
 * @param {ServerResponse<IncomingMessage>} res 
 * @returns 
 */
export async function listUsersRoute(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const pageSize = parseInt(url.searchParams.get('pageSize')) || 10;

    const users = await listUsersUseCase({ page, pageSize });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      message: error.message
    }));
  }
}