import { User } from "./real-estate.model";

export interface Household {
    id: number,
    floorNumber: number,
    squareFootage: number,
    isActive?: boolean,
    owner?: User
}