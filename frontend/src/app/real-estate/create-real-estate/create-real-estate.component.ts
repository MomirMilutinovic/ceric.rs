import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ResponsiveComponent } from '../../shared/responsive-component.component';
import { Router } from '@angular/router';
import { DataService } from '../service/data-service.service';
import { AuthService } from '../../auth/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RealEstate } from '../model/real-estate.model';
import { CityService } from '../service/city.service';
import { RealEstateService } from '../service/real-estate.service';

@Component({
  selector: 'app-create-real-estate',
  templateUrl: './create-real-estate.component.html',
  styleUrl: './create-real-estate.component.css'
})
export class CreateRealEstateComponent extends ResponsiveComponent implements OnInit{
  cities : any[] = []
  selectedCityId?: number;
  createdRealEstate: RealEstate | undefined
  coord: any

  submitted: boolean = false;

  constructor(public res: BreakpointObserver, private fb: FormBuilder, private router: Router,
    private cityService: CityService, private dataService: DataService, private realEstateService: RealEstateService,
    private auth: AuthService, private snackBar: MatSnackBar
  ) {super(res);}

  override ngOnInit(): void {
    this.loadCities()
  }

  createRealEstateForm = this.fb.group({
    city: [null,[Validators.required]],
    address: ['',[Validators.required]],
    floorNumber: [0,[Validators.required]],
  });

  loadCities(): void {
    this.cityService.getAll().subscribe(
      data => {
        this.cities = data;
        console.log(this.cities)
      },
      error => {
        console.log("NAY");
      }
    )
  }

  onCityChange(cityId: number): void {
    console.log('Selected city:', cityId);
  }

  create() {
    this.submitted = true;

    if (!this.createRealEstateForm.valid) return

    const ownerId = this.auth.getLoggedUserId()

    const realEstate: any = {
      address: this.createRealEstateForm.value.address!,
      city: this.createRealEstateForm.value.city!,
      floorNumber: this.createRealEstateForm.value.floorNumber!,
      ownerId: ownerId,
      coordinates: [this.coord.lat, this.coord.lng]
    }

    console.log("real estate ",realEstate)

    this.realEstateService.create(realEstate).subscribe({
      next: (data: any)  => {
        this.createdRealEstate = data;
        console.log(this.createdRealEstate)

        this.dataService.changeId(this.createdRealEstate?.id!);
        this.dataService.changeFloorNumber(this.createdRealEstate?.floorNumber!);

        this.snackBar.open("Created successfully", 'Close', {
          duration: 3000,
        });

        this.router.navigateByUrl("create-household")
      },
      error: () => {
        console.log("NAY");
        this.snackBar.open("Error occured", 'Close', {
          duration: 3000,
        });
      }
    })
  }

  onFileSelected(event: any) {

  }

  onDataReceived(data: any) {
    this.coord = data
  }
}
