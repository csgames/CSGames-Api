import * as express from "express";
import { Body, Controller, Get, Headers, Param, Post, Req, UseGuards, Put, UseFilters, HttpCode } from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./events.dto";
import { Events } from "./events.model";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { Permissions } from "../../../decorators/permission.decorator";
import { CodeExceptionFilter } from "../../../filters/CodedError/code.filter";
import { codeMap } from "./events.exception";
import { AttendeesGuard } from "../attendees/attendees.guard";
import { AttendeesService } from "../attendees/attendees.service";
import { ApiUseTags } from "@nestjs/swagger";
import { DataTablePipe } from "../../../pipes/dataTable.pipe";
import { DataTableInterface } from "../../../interfaces/dataTable.interface";

@ApiUseTags('Event')
@Controller("event")
@UseGuards(PermissionsGuard)
@UseFilters(new CodeExceptionFilter(codeMap))
export class EventsController {
    constructor(private readonly eventsService: EventsService,
                private readonly attendeesService: AttendeesService) {
    }

    @Post()
    @Permissions('event_management:create:event')
    async create(@Req() req: express.Request, @Body(new ValidationPipe()) createEventDto: CreateEventDto) {
        await this.eventsService.create(createEventDto);
    }

    @Put(':id/attendee')
    @Permissions('event_management:add-attendee:event')
    async addAttendee(@Headers('token-claim-user_id') userId: string, @Param('id') eventId: string) {
        await this.eventsService.addAttendee(eventId, userId);
        return {};
    }

    @Get(':id/status')
    @Permissions('event_management:get-status:event')
    async getAttendeeStatus(@Headers('token-claim-user_id') userId: string, @Param('id') eventId: string) {
        const attendee = await this.attendeesService.findOne({userId});

        if (!attendee) {
            return {
                status: 'not-registered'
            };
        }

        return {
            status: await this.eventsService.getAttendeeStatus(attendee._id, eventId)
        };
    }

    @Get()
    @Permissions('event_management:get-all:event')
    async getAll(): Promise<Events[]> {
        return await this.eventsService.findAll();
    }

    @Get(':id')
    @Permissions('event_management:get:event')
    async getByPublicId(@Param('id') id: string) {
        return {
            event: await this.eventsService.findOne({
                _id: id
            })
        };
    }

    @Get(':id/attendee')
    @UseGuards(AttendeesGuard)
    async hasAttendee(@Headers('token-claim-user_id') userId: string, @Param('id') eventId: string) {
        return {registered: await this.eventsService.hasAttendeeForUser(eventId, userId)};
    }

    @Post(':id/attendee/filter')
    @HttpCode(200)
    @Permissions('event_management:get-all:event')
    async eventAttendeeQuery(@Param('id') eventId: string, @Body(new DataTablePipe()) body: DataTableInterface) {
        return await this.eventsService.getFilteredAttendees(eventId, body);
    }
}
