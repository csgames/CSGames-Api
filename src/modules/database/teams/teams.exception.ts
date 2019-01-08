import { CodeException } from '../../../filters/code-error/code.exception';
import { CodeMap } from "../../../filters/code-error/code.filter";
import { HttpStatus } from "@nestjs/common";

export enum Code {
    UNKNOWN,
    ATTENDEE_NOT_FOUND,
    TEAM_NOT_FOUND,
    TEAM_FULL,
    ATTENDEE_HAS_TEAM,
    ATTENDEE_NOT_IN_TEAM
}

export const codeMap: CodeMap = {
    [Code.UNKNOWN]: {
        message: "An unknown error happened.",
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    },
    [Code.ATTENDEE_NOT_FOUND]: {
        message: "Attendee not found.",
        statusCode: HttpStatus.NOT_FOUND
    },
    [Code.TEAM_NOT_FOUND]: {
        message: "Team not found.",
        statusCode: HttpStatus.NOT_FOUND
    },
    [Code.TEAM_FULL]: {
        message: "Team already full.",
        statusCode: HttpStatus.PRECONDITION_FAILED
    },
    [Code.ATTENDEE_HAS_TEAM]: {
        message: "Attendee already has a team.",
        statusCode: HttpStatus.PRECONDITION_FAILED
    },
    [Code.ATTENDEE_NOT_IN_TEAM]: {
        message: "Attendee is not in this team.",
        statusCode: HttpStatus.PRECONDITION_FAILED
    }
};

export class AttendeeNotFoundException extends CodeException {
    constructor() {
        super(Code.ATTENDEE_NOT_FOUND);
    }
}

export class TeamNotFoundException extends CodeException {
    constructor() {
        super(Code.TEAM_NOT_FOUND);
    }
}

export class TeamFullException extends CodeException {
    constructor() {
        super(Code.TEAM_FULL);
    }
}

export class AttendeeHasTeamException extends CodeException {
    constructor() {
        super(Code.ATTENDEE_HAS_TEAM);
    }
}

export class AttendeeNotInTeamException extends CodeException {
    constructor() {
        super(Code.ATTENDEE_NOT_IN_TEAM);
    }
}
