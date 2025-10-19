import { Household } from "./household.model"

export interface RealEstate {
    id?: number,
    households?: Household[],
    address: string,
    city: City,
    floorNumber: number,
    coordinates?: number[],
    images?: string[],
    isActive?: boolean,
    owner?: User
}

export interface City {
    name: string
}

export interface Request {
    id: number,
    realEstate: RealEstate,
    submissionDate: Date,
    approvalDate: Date,
    reasoning: string,
    documents: string[],
    status: RequestStatus
    user: User,
    admin: User
}

export interface User {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string
}

export enum RequestStatus{
    APPROVED,
    DECLINED,
    PENDING
}