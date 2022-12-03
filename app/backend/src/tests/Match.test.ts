import *  as chai from 'chai';
// @ts-ignore

import App from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');
import { matches } from './mocks/matchMocks';


chai.use(chaiHttp);

const { expect } = chai;
const { app } = new App();

describe('GET /matches', () => {
    describe('rota GET /matches ', () => {
        it('deve retornar o status 200 com um json com todas as partidas', async () => { 
            const httpResponse = await chai
            .request(app)
            .get('/matches')
            .send();
                
                expect(httpResponse.status).to.equal(200);
                expect(httpResponse.body).to.deep.equal(matches)
                })
            })   
       
    })