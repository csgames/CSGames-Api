import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CodeException } from "../../../filters/CodedError/code.exception";
import { DataTableInterface, DataTableReturnInterface } from '../../../interfaces/dataTable.interface';
import { BaseService } from "../../../services/base.service";
import { Attendees } from "../attendees/attendees.model";
import { AttendeesService } from "../attendees/attendees.service";
import { Schools } from '../schools/schools.model';
import { CreateOrJoinTeamDto, JoinOrLeaveTeamDto } from "./teams.dto";
import { Code } from "./teams.exception";
import { Teams } from "./teams.model";
import { Events } from '../events/events.model';
import { EventsService } from '../events/events.service';

interface LeaveTeamResponse {
    deleted: boolean;
    team: Teams;
}

@Injectable()
export class TeamsService extends BaseService<Teams, CreateOrJoinTeamDto> {
    constructor(@InjectModel("teams") private readonly teamsModel: Model<Teams>,
                private readonly attendeesService: AttendeesService,
                private readonly eventsService: EventsService) {
        super(teamsModel);
    }

    public async createOrJoin(createOrJoinTeamDto: CreateOrJoinTeamDto, userId: string): Promise<Teams> {
        const team = await this.findOne({ name: createOrJoinTeamDto.name });
        const attendee = await this.attendeesService.findOne({ userId });
        if (!attendee) {
            throw new CodeException(Code.ATTENDEE_NOT_FOUND);
        }
        let attendeeTeam: Teams = await this.findOne({
            attendees: attendee._id, event: createOrJoinTeamDto.event
        });
        if (attendeeTeam) {
            throw new CodeException(Code.ATTENDEE_HAS_TEAM);
        }
        if (team) {
            return this.join({
                attendeeId: attendee._id,
                teamId: team._id,
                event: createOrJoinTeamDto.event
            });
        } else {
            return this.create({
                name: createOrJoinTeamDto.name,
                event: createOrJoinTeamDto.event,
                attendees: [Types.ObjectId(attendee._id)]
            });
        }
    }

    public async join(joinTeamDto: JoinOrLeaveTeamDto): Promise<Teams> {
        let team: Teams = await this.findOne({ _id: joinTeamDto.teamId });
        let event: Events = await this.eventsService.findOne({
            _id: joinTeamDto.event
        });
        if (!team) {
            throw new CodeException(Code.TEAM_NOT_FOUND);
        }

        if (team.attendees.length >= event.maxTeamMembers) {
            throw new CodeException(Code.TEAM_FULL);
        }

        let attendeeTeam: Teams = await this.findOne({
            attendees: joinTeamDto.attendeeId, event: team.event
        });
        if (attendeeTeam) {
            throw new CodeException(Code.ATTENDEE_HAS_TEAM);
        }

        team.attendees.push(Types.ObjectId(joinTeamDto.attendeeId));

        return team.save();
    }

    public async leave(leaveTeamDto: JoinOrLeaveTeamDto): Promise<LeaveTeamResponse> {
        let attendee: Attendees = await this.attendeesService.findOne({ _id: leaveTeamDto.attendeeId });
        if (!attendee) {
            throw new CodeException(Code.ATTENDEE_NOT_FOUND);
        }

        let team: Teams = await this.findOne({ _id: leaveTeamDto.teamId });
        if (!team) {
            throw new CodeException(Code.TEAM_NOT_FOUND);
        }

        let index = team.attendees.indexOf(leaveTeamDto.attendeeId);
        if (index < 0) {
            throw new CodeException(Code.ATTENDEE_NOT_IN_TEAM);
        }
        team.attendees.splice(index, 1);

        // Remove team if it has no attendee.
        if (team.attendees.length === 0) {
            await this.remove({_id: team._id});
            return {deleted: true, team: null};
        }

        // Else save new team.
        return {deleted: false, team: await team.save()};
    }

    public async getFilteredTeam(eventId: string, filter: DataTableInterface) {
        const query = this.teamsModel.find({
            event: eventId
        });
        const data: DataTableReturnInterface = <DataTableReturnInterface> {
            draw: filter.draw,
            recordsTotal: await query.count().exec()
        };

        let sort = filter.columns[filter.order[0].column].name;
        sort = (filter.order[0].dir === 'asc' ? '+' : '-') + sort;

        const teams = await query.find().sort(sort)
            .limit(filter.length)
            .skip(filter.start)
            .exec();

        data.data = teams;
        data.recordsFiltered = data.recordsTotal;

        return data;
    }
}
