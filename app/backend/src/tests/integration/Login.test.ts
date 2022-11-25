import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import App from '../../app';

chai.use(chaiHttp);

// email obrigatório:
// email válido:
// a senha seja obrigatória
// a senha seja válida

describe('POST /login', () => {
    describe('quando a requisição não possui um e-mail válido ', () => {
        it('deve retornar o status 400 com uma mensagem de erro', async () => {
            const httpResponse = await chai
            .request(App)
            .post('/login')
            .send({})

            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.deep.equal( { "message": "All fields must be filled" })
        })
    })
    describe('quando a requisição não possui uma senha válida ', () => {
        it('deve retornar o status 400 com uma mensagem de erro', async () => {
            const httpResponse = await chai
            .request(App)
            .post('/login')
            .send({ "email": "string" })

            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.deep.equal( { "message": "All fields must be filled" })
        })
    })
    describe('quando a requisição possui um email e senha válida', () => {
        it('deve retornar o status 200 com o token', async () => {
            const httpResponse = await chai
            .request(App)
            .post('/login')
            .send({ "email": "string" })

            expect(httpResponse.status).to.equal(200);
            expect(httpResponse.body).to.deep.equal( { "message": "All fields must be filled" })
        })
    })
})