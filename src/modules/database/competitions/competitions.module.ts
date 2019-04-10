import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendeesSchema } from '../attendees/attendees.model';
import { EventsModule } from '../events/events.module';
import { QuestionsSchema } from '../questions/questions.model';
import { RegistrationsModule } from '../registrations/registrations.module';
import { CompetitionsController } from './competitions.controller';
import { CompetitionsSchema } from './competitions.model';
import { CompetitionsService } from './competitions.service';
import { ActivitiesModule } from '../activities/activities.module';
import { TeamsSchema } from '../teams/teams.model';
import { QuestionsModule } from '../questions/questions.module';
import { CompetitionsGateway } from './competitions.gateway';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'competitions',
            schema: CompetitionsSchema
        }]),
        MongooseModule.forFeature([{
            name: 'attendees',
            schema: AttendeesSchema
        }]),
        MongooseModule.forFeature([{
            name: 'teams',
            schema: TeamsSchema
        }]),
        MongooseModule.forFeature([{
            name: 'questions',
            schema: QuestionsSchema
        }]),
        EventsModule,
        RegistrationsModule,
        ActivitiesModule,
        QuestionsModule
    ],
    controllers: [CompetitionsController],
    providers: [
        CompetitionsService,
        CompetitionsGateway
    ],
    exports: [
        CompetitionsService
    ]
})
export class CompetitionsModule {
}
