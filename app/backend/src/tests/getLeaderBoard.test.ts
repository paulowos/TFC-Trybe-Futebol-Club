import * as chai from 'chai';
import * as sinon from 'sinon';
//@ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
import db from '../database/models';
import {
  leaderBoardAwayFromDb,
  leaderBoardHomeFromDb,
} from './mocks/leaderBoard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /leaderboard', function () {
  let response: Response;
  beforeEach(function () {
    sinon.restore();
  });

  it('/home, returns home teams leader board', async function () {
    sinon.stub(db, 'query').resolves(leaderBoardHomeFromDb as any);

    response = await chai.request(app).get('/leaderboard/home');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(leaderBoardHomeFromDb[0]);
  });

  it('/away, returns away teams leader board', async function () {
    sinon.stub(db, 'query').resolves(leaderBoardAwayFromDb as any);

    response = await chai.request(app).get('/leaderboard/away');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(leaderBoardAwayFromDb[0]);
  });
});
