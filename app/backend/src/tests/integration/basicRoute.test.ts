import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import App from '../../app';

describe('Teste da rota básica', () => {
    describe('quando a requisição é feita com sucesso', () => {
        it('deve retornar o status 200, ok', async () => {
            const httpResponse = await chai.request(App).get('/')
            expect(httpResponse.status).to.equal(200); 
            expect(httpResponse.body).to.deep.equal({ ok: true })
        })
    })
})