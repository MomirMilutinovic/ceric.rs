import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    
  private idSource = new BehaviorSubject<number>(0); 
  currentId = this.idSource.asObservable();

  private floorNumber = new BehaviorSubject<number>(0); 
  currentFloorNumber = this.floorNumber.asObservable();

  constructor() { }

  changeId(id: number) {
    this.idSource.next(id);
  }

  changeFloorNumber(floorNum: number) {
    this.floorNumber.next(floorNum);
  }
}