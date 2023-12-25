
export interface identityModel {
    expiresIn: string;
    lastLogin: string;
    createdAt: string;
    accessToken: string;
    permissions: string;
    latitude: string;
    longitude: string;
    jobName: string;
    jobRole : string;
    user: User
}

export interface User {
    id: number;
    userId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    birthDate: Date;
    gender: string;
    bloodGroup: string;
    maritalStatus: string;
    anniversaryDate: Date;
    nationality: string;
    religion: string;
    imageUrl: string;
}

export enum StatusType
{
    Active,
    InActive,
    Pending,
    Suspended
}