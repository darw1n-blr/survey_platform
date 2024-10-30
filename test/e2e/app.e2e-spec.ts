import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { JwtAuthGuard } from '../../src/auth/jwt-auth.guard';

class JwtAuthGuardMock {
    canActivate(context: any) {
        return true;
    }
}

describe('App e2e', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(JwtAuthGuard)
            .useClass(JwtAuthGuardMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/register POST', async () => {

        const data = {
            email: "test1@gmail.com",
            password: "testPassword",
        }

        return request(app.getHttpServer())
            .post('/auth/register')
            .send(data)
            .expect(201)
            .expect((res) => {
                expect(res.body).toMatchObject({
                    token: expect.any(String),
                    userId: expect.any(Number),
                })
            })
    })


    it('/surveys POST', async () => {

        const data = {
            title: 'Ur opinion about cats',
            description: 'Do you like cats? Why or why not?',
        }

        return request(app.getHttpServer())
            .post('/surveys')
            .send(data)
            .expect(201)
            .expect((res) => {
                expect(res.body).toMatchObject({
                    id: expect.any(Number),
                    ...data,
                })
            })

    })



    it('/surveys GET', async () => {
        return request(app.getHttpServer())
            .get('/surveys')
            .expect(200)
            .expect((res) => {
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body[0]).toEqual({
                    id: expect.any(Number),
                    title: 'Ur opinion about cats',
                    description: 'Do you like cats? Why or why not?',
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                });
            });
    });

    it('/response/question POST', async () => {

        const data = {
            text: "Do u have a cat?",
            surveyId: 1,
        }

        return request(app.getHttpServer())
            .post('/response/question')
            .send(data)
            .expect(201)
            .expect((res) => {
                expect(res.body).toMatchObject({
                    id: expect.any(Number),
                    ...data,
                })
            })
    })

    it('/response/question GET', async () => {
        return request(app.getHttpServer())
            .get('/response/questions/1')
            .expect(200)
            .expect((res) => {
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body[0]).toEqual({
                    id: expect.any(Number),
                    text: "Do u have a cat?",
                    surveyId: 1,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                });
            });
    });

    it('/response/choice POST', async () => {

        const data = {
            text: "Yes",
            questionId: 1,
        }

        return request(app.getHttpServer())
            .post('/response/choice')
            .send(data)
            .expect(201)
            .expect((res) => {
                expect(res.body).toMatchObject({
                    id: expect.any(Number),
                    ...data,

                })
            })
    })

    it('/response/choice POST', async () => {

        const data = {
            text: "No",
            questionId: 1,
        }

        return request(app.getHttpServer())
            .post('/response/choice')
            .send(data)
            .expect(201)
            .expect((res) => {
                expect(res.body).toMatchObject({
                    id: expect.any(Number),
                    ...data,
                })
            })
    })

    it('/response/choices GET', async () => {
        return request(app.getHttpServer())
            .get('/response/choices/1')
            .expect(200)
            .expect((res) => {
                expect(res.body).toEqual([{
                    id: expect.any(Number),
                    text: "Yes",
                    questionId: 1,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                },
                    {
                        id: expect.any(Number),
                        text: "No",
                        questionId: 1,
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                    }
                ]);
            });
    });

    it('/response POST', async () => {

        const data = {
            surveyId: 1,
            userId: 1,
        }

        return request(app.getHttpServer())
            .post('/response')
            .send(data)
            .expect(201)
            .expect((res) => {
                expect(res.body).toMatchObject({
                    id: expect.any(Number),
                    ...data,
                })
            })
    })

    it('/response/answer POST', async () => {

        const data = {
            questionId: 1,
            choiceId: 1,
            responseId: 1,
        }

        return request(app.getHttpServer())
            .post('/response/answer')
            .send(data)
            .expect(201)
            .expect((res) => {
                expect(res.body).toMatchObject({
                    id: expect.any(Number),
                    ...data,
                })
            })
    })

    it('/response/answers GET', async () => {
        return request(app.getHttpServer())
            .get('/response/answers/1')
            .expect(200)
            .expect((res) => {
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body[0]).toEqual({
                    id: expect.any(Number),
                    questionId: 1,
                    choiceId: 1,
                    responseId: 1,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                });
            });
    });





    afterAll(async () => {
        await app.close();
    });
});
