import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HouseholdsService} from "../service/households.service";
import {ResponsiveComponent} from "../../shared/responsive-component.component";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Household} from "../model/hosehold-model";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-households-overview',
  templateUrl: './households-overview.component.html',
  styleUrl: './households-overview.component.css'
})
export class HouseholdsOverviewComponent extends ResponsiveComponent implements OnInit{

  displayedColumns: string[] = ['id', 'floorNumber', 'squareFootage', 'owner', 'isActive', 'details'];
  dataSource = new MatTableDataSource<Household>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterHouseholdsForm: FormGroup = new FormGroup({
    floorNumber: new FormControl(),
    squareFootage: new FormControl(),
    isActive: new FormControl(),
    hasOwner: new FormControl()
  });

  constructor(public res: BreakpointObserver, private householdService: HouseholdsService, private router: Router) {
    super(res);
  }

  override ngOnInit(): void {
    this.householdService.getAllHouseholds(null,null,null,null).subscribe((data: Household[]) => {
      this.dataSource.data = data;
    });
  }
  goToDetails(id: number) {
    this.router.navigate(['/household', id]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterClicked() {
    const { floorNumber, squareFootage, isActive, hasOwner } = this.filterHouseholdsForm.value;
    this.householdService.getAllHouseholds(floorNumber,squareFootage,isActive,hasOwner).subscribe((data: Household[]) => {
      this.dataSource.data = data;
    });

  }
}
