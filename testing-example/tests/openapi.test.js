import { jest, describe, test, expect } from '@jest/globals';

import path from 'node:path';
import fs from 'node:fs';

import { load } from 'js-yaml';
import request from 'supertest';
import Ajv from 'ajv';

import { createApp } from '../src/app.js';

const specFilePath = path.resolve('./openapi.yaml');
const fileContents = fs.readFileSync(specFilePath);
const spec = load(fileContents);

const ajv = new Ajv({ strict: false });

const getResponseSchema = (path, method, status='200') => {
  const p = spec.paths[path];
  if (!p) {
    throw new Error(`No openapi path ${path}`);
  }

  const m = p[method.toLowerCase()];
  if (!m) {
    throw new Error(`No method ${method} for path ${path}`);
  }

  const resp = m.responses[status];
  if (!resp) {
    throw new Error(`No response ${status} for ${method} ${path}`);
  }

  const schema = resp.content?.['application/json']?.schema;
  if (!schema) {
    throw new Error(`No JSON response schema for ${status} ${method} ${path}`);
  }

  return schema;
};

describe('Testing OpenAPI spec', () => {
  test('POST /users matches OpenAPI schema', async () => {
    const mockUserService = {
      createUser: jest.fn().mockResolvedValue({ id: '1', username: 'mike', email: 'mike@example.com' }),
    };

    const app = createApp({ userService: mockUserService });
    const response = await request(app)
      .post('/users')
      .send({ username: 'mike', email: 'mike@example.com', password: 'password' })
      .expect(201);
    
    const schema = getResponseSchema('/users', 'POST', '201');
    const validate = ajv.compile(schema);
    const ok = validate(response.body);

    if (!ok) {
      console.error(validate.errors);
    }

    expect(ok).toBe(true);
  });
});