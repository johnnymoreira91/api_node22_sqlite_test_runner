import config from '../../../config/config.js';
import db from '../db.js';

async function verifyAndCreateTableUsers() {
  if (config.NODE_ENV === 'test') {
    db.exec(`
      DROP TABLE IF EXISTS users;`
    );

    db.exec(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
        ) STRICT;`
    )
  } else {
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
      ) STRICT;`
    );
  }
}

export {
  verifyAndCreateTableUsers
}