import *  as chai from 'chai';
// @ts-ignore

import App from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');
import { teams } from './mocks/teamsMocks';


chai.use(chaiHttp);

const { expect } = chai;
const { app } = new App();

describe('GET /teams', () => {
    describe('rota GET /teams ', () => {
        it('deve retornar o status 200 com um json com todos os times', async () => { 
            const httpResponse = await chai
            .request(app)
            .get('/teams')
            .send();
                
                expect(httpResponse.status).to.equal(200);
                expect(httpResponse.body).to.deep.equal(teams)
                })
            })   
    describe('rota GET /teams/:id - sucess ', () => {
        it('deve retornar o status 200 com um json com o id do time', async () => {
            const httpResponse = await chai
            .request(app)
            .get('/teams/1')
            .send();
                
                expect(httpResponse.status).to.equal(200);
                expect(httpResponse.body).to.deep.equal(teams[0]);
                })
            }) 
        describe('rota GET /teams/:id - failed ', () => {
        it('deve retornar o status 400 com mensagem de erro', async () => {
            const httpResponse = await chai
            .request(app)
            .get('/teams/200')
            .send();
                
                expect(httpResponse.status).to.equal(400);
                expect(httpResponse.body).to.deep.equal({ "message": "Team not found" });
                })
            })                                                    
    })