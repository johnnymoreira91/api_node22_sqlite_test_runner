import { DatabaseSync } from 'node:sqlite';
import config from '../../config/config.js';

/**
 * @type {DatabaseSync}
 */
let db = null;

if (config.NODE_ENV === 'test') {
  db = new DatabaseSync(':memory:');
}

if (config.NODE_ENV === 'development') {
  db = new DatabaseSync('./dbdev.sqlite');
}

if (config.NODE_ENV === 'production') {
  db = new DatabaseSync('./dbprod.sqlite');
}

export default db;