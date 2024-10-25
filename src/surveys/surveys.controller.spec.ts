import { Test, TestingModule } from '@nestjs/testing';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


class JwtAuthGuardMock {
    canActivate(context: any) {
        return true;
    }
}

describe('SurveysController', () => {
    let controller: SurveysController;
    let service: SurveysService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SurveysController],
            providers: [
                {
                    provide: SurveysService,
                    useValue: {
                        getAllSurveys: jest.fn().mockResolvedValue([
                            {
                                id: 4,
                                title: 'Your opinion about dogs',
                                description: 'Do u like dogs? What? (Why not)',
                                createdAt: '2024-10-18T19:04:50.671Z',
                                updatedAt: '2024-10-18T19:04:50.671Z',
                            },
                            {
                                id: 5,
                                title: 'Your opinion about cats',
                                description: 'Do u like cats? What? (Why not)',
                                createdAt: '2024-10-18T19:05:05.787Z',
                                updatedAt: '2024-10-18T19:05:05.787Z',
                            },
                            {
                                id: 6,
                                title: 'Your opinion about beer',
                                description: 'Do u like beer? What? (Why not)',
                                createdAt: '2024-10-18T19:05:17.425Z',
                                updatedAt: '2024-10-18T19:05:17.425Z',
                            },
                        ]),
                        getSurvey: jest.fn().mockResolvedValue({
                            id: 4,
                            title: 'Your opinion about dogs',
                            description: 'Do u like dogs? What? (Why not)',
                            createdAt: '2024-10-18T19:04:50.671Z',
                            updatedAt: '2024-10-18T19:04:50.671Z',
                        }),
                    },
                },

            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useClass(JwtAuthGuardMock)
            .compile();

        controller = module.get<SurveysController>(SurveysController);
        service = module.get<SurveysService>(SurveysService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllSurveys', () => {
        it('should return an array of surveys', async () => {
            const surveys = await controller.getAllSurveysTest();
            expect(surveys).toEqual([
                {
                    id: 4,
                    title: 'Your opinion about dogs',
                    description: 'Do u like dogs? What? (Why not)',
                    createdAt: '2024-10-18T19:04:50.671Z',
                    updatedAt: '2024-10-18T19:04:50.671Z',
                },
                {
                    id: 5,
                    title: 'Your opinion about cats',
                    description: 'Do u like cats? What? (Why not)',
                    createdAt: '2024-10-18T19:05:05.787Z',
                    updatedAt: '2024-10-18T19:05:05.787Z',
                },
                {
                    id: 6,
                    title: 'Your opinion about beer',
                    description: 'Do u like beer? What? (Why not)',
                    createdAt: '2024-10-18T19:05:17.425Z',
                    updatedAt: '2024-10-18T19:05:17.425Z',
                },
            ]);
            expect(service.getAllSurveys).toHaveBeenCalled();
        });
    });

    describe('getSurveyById', () => {
        it('should return a survey by ID', async () => {
            const survey = await controller.getSurveyById(4);
            expect(survey).toEqual({
                id: 4,
                title: 'Your opinion about dogs',
                description: 'Do u like dogs? What? (Why not)',
                createdAt: '2024-10-18T19:04:50.671Z',
                updatedAt: '2024-10-18T19:04:50.671Z',
            });
            expect(service.getSurvey).toHaveBeenCalledWith(4);
        });
    });
});
