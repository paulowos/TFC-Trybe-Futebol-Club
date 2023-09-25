import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamSequelizeModel from '../database/models/TeamSequelizeModel';
import { teams } from './mocks/team.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  let response: Response;

  beforeEach(function () {
    sinon.restore();
  });

  it('GET /teams should return a list of teams', async function () {
    sinon.stub(TeamSequelizeModel, 'findAll').resolves(teams as any);

    response = await chai.request(app).get('/teams');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(teams);
  });
});
