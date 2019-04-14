import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSponsorDto {
    @ApiModelProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiModelProperty({ required: true })
    @IsNotEmpty()
    description: { [language: string]: object };

    @ApiModelProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    website: string;

    @ApiModelProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    imageUrl: string;
}

export class UpdateSponsorDto {
    @ApiModelProperty()
    @IsString()
    @IsOptional()
    name: string;

    @ApiModelProperty()
    @IsOptional()
    description: { [language: string]: object };

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    website: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    imageUrl: string;
}
