import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ResponsiveComponent } from '../../shared/responsive-component.component';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../service/data-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HouseholdService } from '../service/household.service';

@Component({
  selector: 'app-create-household',
  templateUrl: './create-household.component.html',
  styleUrl: './create-household.component.css'
})
export class CreateHouseholdComponent extends ResponsiveComponent implements OnInit{
  realEstateId: number = 0
  realEstateFloorNumber: number = 0

  submitted: boolean = false;

  constructor(public res: BreakpointObserver, private fb: FormBuilder, private dataService: DataService,
    private householdService: HouseholdService, private snackBar: MatSnackBar
  ) {super(res);}

  override ngOnInit(): void {
    this.dataService.currentId.subscribe(id => {
      this.realEstateId = id;
      console.log('ID:', this.realEstateId);
    });


    this.dataService.currentFloorNumber.subscribe(num => {
      this.realEstateFloorNumber = num;
      console.log('floor num:', this.realEstateFloorNumber);
    });
  }

  createHouseholdForm = this.fb.group({
    squareFootage: [0,[Validators.required]],
    floorNumber: [0,[Validators.required]],
    id: [0,[Validators.required]]
  });

  create() {
    this.submitted = true;

    if (!this.createHouseholdForm.valid) return

    if (this.createHouseholdForm.value.floorNumber! > this.realEstateFloorNumber) {
      this.snackBar.open("Invalid floor number", 'Close', {
        duration: 3000,
      });
      return
    }

    const household: any = {
      householdNumber: this.createHouseholdForm.value.id!,
      floorNumber: this.createHouseholdForm.value.floorNumber!,
      squareFootage: this.createHouseholdForm.value.squareFootage!,
      realEstateId: this.realEstateId
    }

    this.householdService.create(household).subscribe(
      data => {
        console.log("success")
        console.log(data)
        this.snackBar.open("Created successfully", 'Close', {
          duration: 3000,
        });
      },
      error => {
        if (error.status === 400) {
          this.snackBar.open("Id must be unique", 'Close', {
            duration: 3000,
          });
        }
      }
    )
  }

  addMore() {
    this.create()

    this.createHouseholdForm.reset();
    this.submitted = false; 
  }
}
