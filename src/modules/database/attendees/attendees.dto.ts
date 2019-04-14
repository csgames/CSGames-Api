import { ApiModelProperty } from "@nestjs/swagger";
import { IsBoolean, IsIn, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAttendeeDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    lastName: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    github: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    linkedIn: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    website: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    cv: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsIn(["male", "female", "other", "no_answer"])
    @ApiModelProperty({ required: true })
    gender: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsIn(["small", "medium", "large", "x-large", "2x-large"])
    @ApiModelProperty({ required: true })
    tshirt: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    phoneNumber: string;

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    acceptSMSNotifications: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    hasDietaryRestrictions: boolean;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    dietaryRestrictions: string;

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    handicapped: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    needsTransportPass: boolean;
}

export class UpdateAttendeeDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    firstName: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    lastName: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    github: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    linkedIn: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    website: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    cv: string;

    @IsOptional()
    @IsString()
    @IsIn(["male", "female", "other", "no_answer"])
    @ApiModelProperty()
    gender: string;

    @IsOptional()
    @IsString()
    @IsIn(["small", "medium", "large", "x-large", "2x-large"])
    @ApiModelProperty()
    tshirt: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    phoneNumber: string;

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    acceptSMSNotifications: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    hasDietaryRestrictions: boolean;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    dietaryRestrictions: string;

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    handicapped: boolean;

    @IsOptional()
    @IsBoolean()
    @ApiModelProperty()
    needsTransportPass: boolean;
}

export class AddTokenDto {
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    token: string;
}

export class UpdateNotificationDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    notification: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiModelProperty({ required: true })
    seen: boolean;
}
