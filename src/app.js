import config from './config/config.js';
import { verifyAndCreateTableUsers } from './infra/database/user/table.js';
import { healthCheck } from './useCase/healthCheck/healthCheck.js';
import { routeNotFound } from './useCase/routeNotFound/routeNotFoud.js';
import { createUserRoute } from './useCase/user/createUser/createUserRoute.js';
import { listUsersRoute } from './useCase/user/listUsers/listUsersRoute.js';
import JWT from 'jsonwebtoken'

async function startServer() {
  await verifyAndCreateTableUsers();
}

function isHeadersValid(headers) {
  if (!headers.authorization) {
    return false;
  }

  try {
    const auth = headers.authorization.replace(/bearer\s/ig, '');

    JWT.verify(auth, config.JWT_SECRET);
    return true
  } catch (error) {
    console.error(error)
    return false
  }
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

  if (request.url === '/v1/users' && request.method === 'POST') {
    return await createUserRoute(request, response);
  }

  if (!isHeadersValid(request.headers)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not authorized' }));
    return;
  }

  if (request.url === '/v1/users' && request.method === 'GET') {
    return await listUsersRoute(request, response);
  }

  routeNotFound(request, response);
}

export {
  startServer,
  requestHandler
}