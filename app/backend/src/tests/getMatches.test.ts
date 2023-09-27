import * as chai from 'chai';
import * as sinon from 'sinon';
//@ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
import MatchSequelizeModel from '../database/models/MatchSequelizeModel';

chai.use(chaiHttp);

const { expect } = chai;

import {
  matches,
  matchesInProgress,
  matchesNotInProgress,
} from './mocks/match.mock';

describe('GET /matches', function () {
  let response: Response;
  beforeEach(function () {
    sinon.restore();
  });
  it('should return a list of matches', async function () {
    sinon.stub(MatchSequelizeModel, 'findAll').resolves(matches as any);

    response = await chai.request(app).get('/matches');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(matches);
  });

  it('?inProgress=true should return a list of matches in progress', async function () {
    sinon
      .stub(MatchSequelizeModel, 'findAll')
      .resolves(matchesInProgress as any);

    response = await chai.request(app).get('/matches?inProgress=true');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(matchesInProgress);
  });

  it('?inProgress=false should return a list of matches not in progress', async function () {
    sinon
      .stub(MatchSequelizeModel, 'findAll')
      .resolves(matchesNotInProgress as any);

    response = await chai.request(app).get('/matches?inProgress=false');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(matchesNotInProgress);
  });
});
