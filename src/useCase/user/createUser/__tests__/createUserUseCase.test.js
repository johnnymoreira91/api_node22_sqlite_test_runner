import { describe, it, before, after } from 'node:test';
import { deepStrictEqual } from 'node:assert';
import { createUserUseCase } from '../createUserUseCase.js';
import db from '../../../../infra/database/db.js';
import { verifyAndCreateTableUsers } from '../../../../infra/database/user/table.js';

describe('UNIT -> CreateUSerUseCase', () => {

  before(() => {
    verifyAndCreateTableUsers();
  })

  after(() => {
    db.exec('DELETE FROM users');
  })

  it('Should create a new valid user', async () => {
    const payload = {
      name: 'Test',
      email: 'test@test.com',
      password: 'test123'
    }
    const response = await createUserUseCase(payload)

    deepStrictEqual(response.id, 2)
    deepStrictEqual(response.name, 'Test')
    deepStrictEqual(response.email, 'test@test.com')
  });

});
