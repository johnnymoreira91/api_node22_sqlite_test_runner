/**
 * Not Found Route - 404
 * @param {IncomingMessage} request 
 * @param {ServerResponse<IncomingMessage>} response 
 */
export function routeNotFound(request, response) {
  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ message: 'Route not found', statusCode: 404 }));
}
