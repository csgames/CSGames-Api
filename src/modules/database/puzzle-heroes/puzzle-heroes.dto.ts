import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";
import { CreateQuestionDto, UpdateQuestionDto } from "../questions/questions.dto";

export class CreatePuzzleHeroDto {
    @IsNotEmpty()
    releaseDate: Date | string;

    @IsNotEmpty()
    endDate: Date | string;
}

export class UpdatePuzzleHeroDto {
    @IsNotEmpty()
    releaseDate: Date | string;

    @IsNotEmpty()
    endDate: Date | string;

    @IsNotEmpty()
    scoreboardEndDate: Date | string;

    @IsNotEmpty()
    open: boolean;
}

export class CreateTrackDto {
    @IsNotEmpty()
    label: string;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    releaseDate: Date | string;

    @IsNotEmpty()
    endDate: Date | string;
}

export class UpdateTrackDto {
    @IsNotEmpty()
    label: string;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    releaseDate: Date | string;

    @IsNotEmpty()
    endDate: Date | string;
}

export class CreatePuzzleDto extends CreateQuestionDto {
    @IsOptional()
    @IsMongoId()
    dependsOn: string;
}

export class UpdatePuzzleDto extends UpdateQuestionDto {
    @IsOptional()
    @IsMongoId()
    dependsOn: string;
}
