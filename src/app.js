import { verifyAndCreateTableUsers } from './infra/database/user/table.js';
import { healthCheck } from './useCase/healthCheck/healthCheck.js';
import { routeNotFound } from './useCase/routeNotFound/routeNotFoud.js';
import { createUserRoute } from './useCase/user/createUser/createUserRoute.js';
import { listUsersRoute } from './useCase/user/listUsers/listUsersRoute.js';

async function startServer() {
  await verifyAndCreateTableUsers();
}

/**
 * Function include all requests
 * @param {IncomingMessage} request 
 * @param {ServerResponse<IncomingMessage>} response 
 */
async function requestHandler(request, response) {
  if (request.url === '/healthcheck') {
    return healthCheck(request, response);
  }

  if (request.url === '/v1/users' && request.method === 'GET') {
    return await listUsersRoute(request, response);
  }

  if (request.url === '/v1/users' && request.method === 'POST') {
    return await createUserRoute(request, response);
  }

  routeNotFound(request, response);
}

export {
  startServer,
  requestHandler
}