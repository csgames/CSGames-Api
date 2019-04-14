import { UserModel } from "@polyhx/nest-services";
import * as mongoose from "mongoose";
import * as uuid from "uuid";
import { Notifications } from "../notifications/notifications.model";

export interface AttendeeNotifications {
    notification: (Notifications | mongoose.Types.ObjectId | string);
    seen: boolean;
}

export const AttendeeNotificationSchema = new mongoose.Schema({
    notification: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "notifications"
    },
    seen: {
        type: Boolean,
        required: true,
        default: false
    }
});

export interface Attendees extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    github: string;
    linkedIn: string;
    cv: string;
    website: string;
    gender: string;
    tshirt: string;
    phoneNumber: string;
    acceptSMSNotifications: boolean;
    hasDietaryRestrictions: boolean;
    dietaryRestrictions: string;
    publicId: string;
    user: UserModel;
    messagingTokens: string[];
    notifications: AttendeeNotifications[];
    handicapped: boolean;
    needsTransportPass: boolean;
}

export const AttendeesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    github: {
        type: String,
        default: null
    },
    linkedIn: {
        type: String,
        default: null
    },
    cv: {
        type: String,
        default: null
    },
    website: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        enum: ["male", "female", "other", "no_answer"]
    },
    tshirt: {
        type: String,
        enum: ["small", "medium", "large", "x-large", "2x-large"]
    },
    phoneNumber: {
        type: String,
        default: null
    },
    acceptSMSNotifications: {
        type: Boolean,
        default: false
    },
    hasDietaryRestrictions: {
        type: Boolean,
        default: false
    },
    dietaryRestrictions: {
        type: String,
        default: null
    },
    publicId: {
        type: String,
        required: true,
        unique: true,
        default: () => {
            return uuid.v4();
        }
    },
    messagingTokens: {
        type: [String],
        default: []
    },
    notifications: [AttendeeNotificationSchema],
    handicapped: {
        type: Boolean,
        default: false
    },
    needsTransportPass: {
        type: Boolean,
        default: false
    }
});
