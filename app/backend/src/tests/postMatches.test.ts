import * as chai from 'chai';
import * as sinon from 'sinon';
//@ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
const { expect } = chai;

import * as jwt from 'jsonwebtoken';
import MatchSequelizeModel from '../database/models/MatchSequelizeModel';

chai.use(chaiHttp);

import {
  matchFromDb,
  matchRequest,
  matchRequestSameId,
} from './mocks/match.mock';
import { userFromDB } from './mocks/user.mock';
import UserSequelizeModel from '../database/models/UserSequelizeModel';

describe('POST /matches', function () {
  let response: Response;

  beforeEach(function () {
    sinon.restore();
    sinon.stub(jwt, 'verify').callsFake(() => ({ id: 1, role: 'admin' }));
    sinon.stub(UserSequelizeModel, 'findByPk').resolves(userFromDB as any);
  });

  it('when successful', async function () {
    sinon.stub(MatchSequelizeModel, 'create').resolves(matchFromDb as any);

    response = await chai
      .request(app)
      .post('/matches')
      .set('authorization', 'token')
      .send(matchRequest);

    expect(response.status).to.equal(201);
    expect(response.body).to.deep.equal(matchFromDb);
  });

  it('returns error when request body with same id for both teams', async function () {
    response = await chai
      .request(app)
      .post('/matches')
      .set('authorization', 'token')
      .send(matchRequestSameId);

    expect(response.status).to.equal(422);
    expect(response.body).to.deep.equal({
      message: 'It is not possible to create a match with two equal teams',
    });
  });

  it('returns error when team id not found', async function () {
    sinon.stub(MatchSequelizeModel, 'create').rejects();

    response = await chai
      .request(app)
      .post('/matches')
      .set('authorization', 'token')
      .send(matchRequest);

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({
      message: 'There is no team with such id!',
    });
  });
});
