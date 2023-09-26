import * as chai from 'chai';
import * as sinon from 'sinon';
//@ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
const { expect } = chai;

import UserSequelizeModel from '../database/models/UserSequelizeModel';
import * as jwt from 'jsonwebtoken';
import { userFromDB } from './mocks/user.mock';

describe('GET /login/role', function () {
  let response: Response;
  beforeEach(() => sinon.restore());

  it('when successful', async function () {
    sinon.stub(jwt, 'verify').callsFake(() => ({ id: 1, role: 'admin' }));
    sinon.stub(UserSequelizeModel, 'findByPk').resolves(userFromDB as any);

    response = await chai
      .request(app)
      .get('/login/role')
      .set({ authorization: 'token' });

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ role: 'admin' });
  });

  it('when token not provided', async function () {
    response = await chai.request(app).get('/login/role');

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ message: 'Token not found' });
  });

  it('with invalid token', async function () {
    sinon.stub(jwt, 'verify').throws();

    response = await chai
      .request(app)
      .get('/login/role')
      .set({ authorization: 'token' });

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({
      message: 'Token must be a valid token',
    });
  });

  it('when user not found', async function () {
    sinon.stub(jwt, 'verify').callsFake(() => ({ id: 1, role: 'admin' }));
    sinon.stub(UserSequelizeModel, 'findByPk').resolves(null);

    response = await chai
      .request(app)
      .get('/login/role')
      .set({ authorization: 'token' });

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({
      message: 'Token must be a valid token',
    });
  });
});
