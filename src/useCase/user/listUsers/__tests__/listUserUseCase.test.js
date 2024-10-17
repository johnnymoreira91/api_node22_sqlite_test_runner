import { describe, it, before, after } from 'node:test';
import { deepStrictEqual } from 'node:assert';
import { listUsersUseCase } from '../listUsersUseCase.js';
import db from '../../../../infra/database/db.js';
import { verifyAndCreateTableUsers } from '../../../../infra/database/user/table.js';

describe('UNIT -> ListUserUseCase', () => {

  before(() => {
    verifyAndCreateTableUsers();
  })

  after(() => {
    db.exec('DELETE FROM users');
  })

  it('Should return a list of users', async () => {
    const response = await listUsersUseCase({ page: 1, pageSize: 10 });
    
    deepStrictEqual(response.users[0].email, 'john@doeindustries.com')
  });

});
