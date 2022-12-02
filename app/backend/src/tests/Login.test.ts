import *  as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import Sinon = require('sinon');
import App from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');
// import { before, after } from 'node:test';
import * as jwt from 'jsonwebtoken';
import UsersModel from '../database/models/UsersModel';
import { token, user, verify } from './mocks/userMocks';

chai.use(chaiHttp);

const { expect } = chai;
const { app } = new App();

describe('POST /login', () => {
    describe('quando a requisição não possui um e-mail válido ', () => {
        it('deve retornar o status 400 com uma mensagem de erro', async () => {
            const httpResponse = await chai
            .request(app)
            .post('/login')
            .send({})

            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.deep.equal( { "message": "All fields must be filled" })
        })
    })
    describe('quando a requisição não possui uma senha válida ', () => {
        it('deve retornar o status 400 com uma mensagem de erro', async () => {
            const httpResponse = await chai
            .request(app)
            .post('/login')
            .send({ "email": "string" })

            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.deep.equal( { "message": "All fields must be filled" })
        })
    })
    describe('quando a requisição possui um email e senha válida', () => {
        it('deve retornar o status 200 com o token', async () => {
            const httpResponse = await chai
            .request(app)
            .post('/login')
            .send({ "email": "admin@admin.com",
                    "password": "secret_admin" })

            expect(httpResponse.status).to.equal(200);
        })
        })
    describe('quando a requisição possui um email ou senha inválidos', () => {
        it('deve retornar o status 400 com uma mensagem de erro', async () => {
            const httpResponse = await chai
            .request(app)
            .post('/login')
            .send({ "email": "string", "password": "string" })
    
                expect(httpResponse.status).to.equal(401);
                expect(httpResponse.body).to.deep.equal( { "message": "Incorrect email or password" })
            })
        }) 
    describe('rota GET /login/validate sem um token', () => {
        it('deve retornar o status 401 com uma mensagem de erro', async () => {
            const httpResponse = await chai
            .request(app)
            .get('/login/validate')
            .set({});
        
                expect(httpResponse.status).to.equal(400);
                expect(httpResponse.body).to.deep.equal( { "message": "Token must be valid" })
                })
            }) 
    describe('rota GET /login/validate token invalido', () => {
        it('deve retornar o status 401 com uma mensagem de erro', async () => {
            const httpResponse = await chai
            .request(app)
            .get('/login/validate')
            .set(token);
        
                expect(httpResponse.status).to.equal(500);
                expect(httpResponse.body).to.deep.equal({ "message": "invalid token" });
                })
            })
    // describe.only('rota GET /login/validate token válido', () => {
    //     it('deve retornar o status 200 com o tipo do usuário', async () => {
    //         Sinon.stub(jwt, 'verify').resolves(verify);
    //         Sinon.stub(UsersModel, 'findOne').resolves(user as UsersModel);
      
                    
    //         const httpResponse = await chai
    //         .request(app)
    //         .get('/login/validate')
    //         .set('Authorization', token.Authorization)
    //         .send();
                
    //             expect(httpResponse.status).to.equal(200);
    //             expect(httpResponse.body).to.deep.equal( { "role": "admin" })
    //             })
    //         })                        
    })