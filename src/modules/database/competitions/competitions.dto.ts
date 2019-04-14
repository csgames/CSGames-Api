import { ArrayNotEmpty, IsBoolean, IsEmail, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateAttendeeDto } from "../attendees/attendees.dto";
import { CreateQuestionDto } from "../questions/questions.dto";
import { QuestionGraphNodes } from "./questions/question-graph-nodes.model";
import { TeamResults } from "./results/team-result.model";

export class CreateCompetitionDto {
    @IsNotEmpty()
    @ArrayNotEmpty()
    activities: string[];

    @IsOptional()
    directors: string[];

    @IsOptional()
    @IsNotEmpty()
    description: { [lang: string]: string };

    @IsNotEmpty()
    @IsNumber()
    maxMembers: number;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    onDashboard: boolean;

    @IsNumber()
    weight: number;
}

export class UpdateCompetitionDto {
    @IsOptional()
    @ArrayNotEmpty()
    activities: string[];

    @IsOptional()
    directors: string[];

    @IsOptional()
    questions: QuestionGraphNodes[];

    @IsOptional()
    results: TeamResults[];

    @IsOptional()
    @IsNotEmpty()
    description: { [lang: string]: string };

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    maxMembers: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsNumber()
    weight: number;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isLive: boolean;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    onDashboard: boolean;
}

export class AuthCompetitionDto {
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class CreateDirectorDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    username: string;

    /*
     * At least 6 characters
     * At least one digit
     * At least one uppercase
     * At least one lowercase
     */
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @ValidateNested()
    attendee: CreateAttendeeDto;
}

export class CreateCompetitionQuestionDto extends CreateQuestionDto {
    @IsOptional()
    @IsMongoId()
    dependsOn: string;
}
