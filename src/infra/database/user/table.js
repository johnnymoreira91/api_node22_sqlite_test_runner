import config from '../../../config/config.js';
import sqlBricks from 'sql-bricks';
import db from '../db.js';

const seed = [
  {
    name: 'John Doe',
    email: 'john@doeindustries.com',
    password: '@SecurePassword123'
  }
]

function runSeed(items) {
 for (const item of items) {
  const { text, values } = sqlBricks.insertInto('users', item)
  .toParams({ placeholder: '?' })

const insertStatement = db.prepare(text)
insertStatement.run(...values)
 }
}

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

    runSeed(seed)
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