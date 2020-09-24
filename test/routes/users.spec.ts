import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { Response } from 'superagent';
import { request, expect } from 'chai';

import app from '../../src/app';
import { User } from '../../src/models/user';

chai.use(chaiHttp);
const urlServer = 'http://0.0.0.0:3000';

chai.use(chaiHttp);

const user: User = {
  // generic random value from 1 to 100 only for tests so far
  id: Math.floor(Math.random() * 100) + 1,
  username: 'John',
  firstName: 'John',
  lastName: 'Doe',
  email: 'John@myemail.com',
  password: 'password',
  phone: '5555555',
  userStatus: 1,
};

describe('userRoute', () => {
  it('should respond with HTTP 404 status because there is no user', async () => {
    const res: Response = await request(urlServer).get(
      `/users/${user.username}`
    );
    expect(res.status).to.be.equal(404);
  });
  it('should create a new user and retrieve it back', async () => {
    const res: Response = await request(urlServer).post(`/users/`);
    expect(res.status).to.be.equal(201);
    expect(res.body.username).to.be.equal(user.username);
  });
  it('should return the user created on the step before', async () => {
    const res: Response = await request(urlServer).get(
      `/users/${user.username}`
    );
    expect(res.status).to.be.equal(200);
    expect(res.body.username).to.be.equal(user.username);
  });
  it('should updated the user John', async () => {
    user.username = 'John Updated';
    user.firstName = 'John Updated';
    user.lastName = 'Doe Updated';
    user.email = 'John@myemail_updated.com';
    user.password = 'password Updated';
    user.phone = '3333333';
    user.userStatus = 12;

    return chai
      .request(app)
      .patch(`/users/John`)
      .send(user)
      .then((res) => {
        expect(res.status).to.be.equal(204);
      });
  });
  it('should return the user updated on the step before', async () => {
    const res: Response = await request(urlServer).get(
      `/users/${user.username}`
    );
    expect(res.status).to.be.equal(200);
    expect(res.body.username).to.be.equal(user.username);
    expect(res.body.firstName).to.be.equal(user.firstName);
    expect(res.body.lastName).to.be.equal(user.lastName);
    expect(res.body.email).to.be.equal(user.email);
    expect(res.body.password).to.be.equal(user.password);
    expect(res.body.phone).to.be.equal(user.phone);
    expect(res.body.userStatus).to.be.equal(user.userStatus);
  });
  it('should return 404 because the user does not exist', async () => {
    user.firstName = 'Mary Jane';

    const res: Response = await request(urlServer)
      .patch(`/users/Mary`)
      .send(user);
    expect(res.status).to.be.equal(404);
  });
  it('should remove an existent user', async () => {
    const res: Response = await request(urlServer).del(
      `/users/${user.username}`
    );
    expect(res.status).to.be.equal(204);
  });
  it('should return 404 when it is trying to remove an user because the user does not exist', async () => {
    const res: Response = await request(urlServer).del(`/users/Mary`);
    expect(res.status).to.be.equal(404);
  });
});
