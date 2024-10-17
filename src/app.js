import { healthCheck } from './useCase/healthCheck/healthCheck.js';
import { routeNotFound } from './useCase/routeNotFound/routeNotFoud.js';

/**
 * Function include all requests
 * @param {IncomingMessage} request 
 * @param {ServerResponse<IncomingMessage>} response 
 */
async function requestHandler(request, response) {
  if (request.url === '/healthcheck') {
    return healthCheck(request, response);
  }

  routeNotFound(request, response);
}

export {
  requestHandler
}