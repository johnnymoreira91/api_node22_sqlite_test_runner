import { IncomingMessage, ServerResponse } from 'node:http'

/**
 * Health Check Route
 * @param {IncomingMessage} req 
 * @param {ServerResponse<IncomingMessage>} res 
 * @returns 
 */
export function healthCheck(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  const body = {
    status: 'OK',
    message: 'Server is running',
    alert: 'I am alive!'
  };
  return res.end(JSON.stringify(body));
}