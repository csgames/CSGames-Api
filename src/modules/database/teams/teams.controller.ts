import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put, UseFilters, UseGuards } from "@nestjs/common";
import { ApiUseTags } from "@nestjs/swagger";
import { EventId } from "../../../decorators/event-id.decorator";
import { Permissions } from "../../../decorators/permission.decorator";
import { User } from "../../../decorators/user.decorator";
import { CodeExceptionFilter } from "../../../filters/code-error/code.filter";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { UserModel } from "../../../models/user.model";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { AttendeesService } from "../attendees/attendees.service";
import { UpdateTeamDto } from "./teams.dto";
import { codeMap } from "./teams.exception";
import { Teams } from "./teams.model";
import { TeamsService } from "./teams.service";

@ApiUseTags("Team")
@Controller("team")
@UseGuards(PermissionsGuard)
@UseFilters(new CodeExceptionFilter(codeMap))
export class TeamsController {
    constructor(private readonly teamsService: TeamsService,
                private readonly attendeesService: AttendeesService) {
    }

    @Put(":id")
    @Permissions("csgames-api:update:team")
    public async updateTeam(@Param("id") id: string, @Body(new ValidationPipe()) updateTeamDto: UpdateTeamDto,
                            @EventId() eventId: string, @User() user: UserModel) {
        return this.teamsService.updateTeam(id, updateTeamDto, eventId, user);
    }

    @Get()
    @Permissions("csgames-api:get-all:team")
    public async getAll(): Promise<Teams[]> {
        return this.teamsService.findAll({
            path: "attendees",
            model: "attendees"
        });
    }

    @Get("info")
    @Permissions("csgames-api:get:team")
    public async getInfo(@User() user: UserModel, @EventId() eventId: string): Promise<Teams> {
        return this.getTeamByUserAndEvent(eventId, user.username);
    }

    @Get("info/:email")
    @Permissions("csgames-api:get:team")
    public async getAttendeeTeamInfo(@Param("email") email: string, @EventId() eventId: string): Promise<Teams> {
        const attendee = await this.attendeesService.findOne({ email });
        if (!attendee) {
            return null;
        }

        return await this.teamsService.getTeamInfo(attendee._id, eventId);
    }

    @Get("event/:eventId/user/:email")
    @Permissions("csgames-api:get:team")
    public async getTeamByUserAndEvent(@Param("eventId") event: string, @Param("email") email: string): Promise<Teams> {
        const attendee = await this.attendeesService.findOne({ email });
        if (!attendee) {
            return null;
        }

        return await this.teamsService.getTeamInfo(attendee._id, event);
    }

    @Get(":id")
    @Permissions("csgames-api:get:team")
    public get(@Param("id") id: string, @EventId() eventId: string): Promise<Teams> {
        return this.teamsService.getTeamById(id, eventId);
    }

    @Delete(":teamId/attendee/:attendeeId")
    @Permissions("csgames-api:update:team")
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteAttendeeFromTeam(@Param("teamId") teamId: string, @Param("attendeeId") attendeeId: string,
                                        @EventId() eventId: string) {
        await this.teamsService.deleteAttendeeFromTeam(eventId, attendeeId, teamId);
    }
}
