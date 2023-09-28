import * as chai from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
//@ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
import MatchSequelizeModel from '../database/models/MatchSequelizeModel';
import UserSequelizeModel from '../database/models/UserSequelizeModel';
import { userFromDB } from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('PATCH /matches', function () {
  let response: Response;
  beforeEach(function () {
    sinon.restore();
    sinon.stub(jwt, 'verify').callsFake(() => ({ id: 1, role: 'admin' }));
    sinon.stub(UserSequelizeModel, 'findByPk').resolves(userFromDB as any);
  });

  it('/:id should update goals', async function () {
    sinon.stub(MatchSequelizeModel, 'update').resolves();

    response = await chai
      .request(app)
      .patch('/matches/41')
      .set('authorization', 'token')
      .send({ homeTeamGoals: 3, awayTeamGoals: 0 });

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'Goals updated' });
  });

  it('/:id/finish when successful', async function () {
    sinon.stub(MatchSequelizeModel, 'update').resolves();

    response = await chai
      .request(app)
      .patch('/matches/41/finish')
      .set('authorization', 'token');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'Finished' });
  });
});
