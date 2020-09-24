'use strict';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import app from '../../src/app';

import { Response } from 'superagent';
import { request, expect } from 'chai';

chai.use(chaiHttp);
const urlServer = 'http://0.0.0.0:3000';

describe('baseRoute', () => {
  it('should respond with HTTP 200 status', async () => {
    const res: Response = await request(urlServer).get('/index');
    expect(res.status).to.be.equal(200);
  });
  it('should respond with success message', async () => {
    const res: Response = await request(urlServer).get('/index');
    expect(res.status).to.be.equal(200);
  });
});
