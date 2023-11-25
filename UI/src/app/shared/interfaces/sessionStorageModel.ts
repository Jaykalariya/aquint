import { UserChat, UserSession, UserStudent, userBusiness } from "../models/common.model";

export interface identityModel {
    expiresIn: string;
    lastLogin: string;
    createdAt: string;
    accessToken: string;
    currentBusinessId: string;
    currentBusinessName: string;
    currentBusinessShortName: string;
    currentBusinessLogo: string;
    permissions: string;
    latitude: string;
    longitude: string;
    jobName: string;
    jobRole : string;
    user: User
}

export interface User {
    userId: string;
    avatarUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    zip: string;
    state: string;
    city: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    hasPhotoAgreement: boolean;
    status: any;
    isFixedRate: boolean;
    defaultFixedRate: any;
    defaultAssistantFixedRate: any;
    defaultVariableRate: any;
    userBusiness: userBusiness[];
    userStudent: UserStudent[];
    userSession: UserSession[];
    userChat: UserChat[];
    created: string;
    modified: string;
    stripeCustomerId: string;
    enableNewsLettersNotification: boolean;
    enableSessionsNotification: boolean;
    enableProgramsNotification: boolean;
    enableSchoolUpdatesNotification: boolean;
    enableChatUpdatesNotification: boolean;
    enableRosterUpdatesNotification: boolean;
    onboardingProcessCompleted: boolean;
    userBusinessRole: string;
}

export enum StatusType
{
    Active,
    InActive,
    Pending,
    Suspended
}