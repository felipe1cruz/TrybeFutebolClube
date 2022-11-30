import *  as chai from 'chai';
import * as sinon from 'sinon';
import App from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');

const { app } = new App();

const { expect } = chai;

describe('Teste da rota básica', () => {
    describe('quando a requisição é feita com sucesso', () => {
        it('deve retornar o status 200, ok', async () => {
            const httpResponse = await chai.request(app).get('/')
            expect(httpResponse.status).to.equal(200); 
            expect(httpResponse.body).to.deep.equal({ ok: true })
        })
    })
})