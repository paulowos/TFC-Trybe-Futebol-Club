import * as chai from 'chai';
import * as sinon from 'sinon';
//@ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
const { expect } = chai;

import UserSequelizeModel from '../database/models/UserSequelizeModel';
import {
  userFromDB,
  userInvalidEmail,
  userInvalidPassword,
  userRequest,
  userRequestNoEmail,
  userRequestNoPassword,
} from './mocks/user.mock';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

chai.use(chaiHttp);

describe('User', function () {
  let response: Response;

  beforeEach(function () {
    sinon.restore();
  });

  it('POST /login when successful', async function () {
    sinon.stub(UserSequelizeModel, 'findOne').resolves(userFromDB as any);
    sinon.stub(jwt, 'sign').callsFake(() => 'testToken');
    sinon.stub(bcrypt, 'compareSync').callsFake(() => true);

    response = await chai.request(app).post('/login').send(userRequest);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ token: 'testToken' });
  });

  it('POST /login with wrong password', async function () {
    sinon.stub(UserSequelizeModel, 'findOne').resolves(userFromDB as any);
    sinon.stub(bcrypt, 'compareSync').callsFake(() => false);

    response = await chai.request(app).post('/login').send(userRequest);

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({
      message: 'Invalid email or password',
    });
  });

  it('POST /login with wrong email', async function () {
    sinon.stub(UserSequelizeModel, 'findOne').resolves(null);

    response = await chai.request(app).post('/login').send(userRequest);

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({
      message: 'Invalid email or password',
    });
  });

  it('POST /login with without password', async function () {
    response = await chai
      .request(app)
      .post('/login')
      .send(userRequestNoPassword);

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      message: 'All fields must be filled',
    });
  });

  it('POST /login with without email', async function () {
    response = await chai.request(app).post('/login').send(userRequestNoEmail);

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      message: 'All fields must be filled',
    });
  });

  it('POST /login with invalid password', async function () {
    response = await chai.request(app).post('/login').send(userInvalidPassword);

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({
      message: 'Invalid email or password',
    });
  });

  it('POST /login with without email', async function () {
    response = await chai.request(app).post('/login').send(userInvalidEmail);

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({
      message: 'Invalid email or password',
    });
  });
});
