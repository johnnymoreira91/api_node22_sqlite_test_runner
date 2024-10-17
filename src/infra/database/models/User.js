import sqlBricks from 'sql-bricks';
import db from '../db.js';

class User {
  _tableName = 'users';

  constructor({ id, name, email, password }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async create({ name, email, password }) {
    const { text, values } = sqlBricks
      .insertInto(this._tableName, { name, email, password })
      .toParams({ placeholder: '?' });

    const insertStatement = db.prepare(text);
    const result = insertStatement.run(...values);

    return new User({
      id: result.lastInsertRowid,
      name,
      email,
      password
    });
  }

  static async findById(id) {
    const stmt = db.prepare(`
      SELECT * FROM ${this._tableName} WHERE id = ?;
    `);
    const user = stmt.get(id);

    if (!user) {
      throw new Error('User not found');
    }

    return new User(user);
  }

  async save() {
    const stmt = db.prepare(`
      UPDATE ${this._tableName} 
      SET name = ?, email = ?, password = ? 
      WHERE id = ?;
    `);
    const result = stmt.run(this.name, this.email, this.password, this.id);

    return result.changes > 0;
  }

  static async list({ page = 1, pageSize = 10 } = {}) {
    const offset = (page - 1) * pageSize;

    const countStmt = db.prepare(`SELECT COUNT(*) AS total FROM users`);
    const { total } = countStmt.get();

    const query = sqlBricks
      .select('*')
      .from('users')
      .orderBy('name')
      // .limit(pageSize)
      // .offset(offset)
      .toString();

    // const query = sqliteBricks
    //   .select('*')
    //   .from(this._tableName)
    //   .orderBy('name')
    //   .limit(pageSize)
    //   .offset(offset)
    //   .toString();

    const stmt = db.prepare(query);
    const users = stmt.all();

    return {
      total,         
      page,            
      pageSize,   
      users: users.map(user => new User(user)) 
    };

  }

  static async delete(id) {
    const stmt = db.prepare(`
      DELETE FROM ${this.prototype._tableName} 
      WHERE id = ?;
    `);
    const result = stmt.run(id);
    return result.changes > 0;
  }
}

export default User;
