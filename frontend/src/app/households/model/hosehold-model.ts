import {User} from "./user-model";

export interface Household {
  id: number;
  floorNumber: number;
  squareFootage: number;
  owner?: User;
  isActive: boolean;
}
