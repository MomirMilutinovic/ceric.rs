import { Component, OnInit, ViewChild } from '@angular/core';
import { ResponsiveComponent } from '../../shared/responsive-component.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth/service/auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RealEstateService } from '../service/real-estate.service';
import { RequestStatus, Request, RealEstate } from '../model/real-estate.model';
import { RequestDeclineDialogComponent } from '../request-decline-dialog/request-decline-dialog.component';

@Component({
  selector: 'app-requests-overview',
  providers: [DatePipe],
  templateUrl: './requests-overview.component.html',
  styleUrl: './requests-overview.component.css'
})
export class RequestsOverviewComponent extends ResponsiveComponent implements OnInit{
  displayedColumns: string[] = [];
  requests: any[] = [];
  dataSource = new MatTableDataSource<Request>([]);
  reasoning : string = ""
  loggedUserRoles: any
  loggedUserId: number = 0
  admin: any
  statusOptions = ['', 'PENDING', 'APPROVED', 'DECLINED'];
  sortOptions = [
    { value: 'admin_desc', label: 'Admin Desc' },
    { value: 'admin_asc', label: 'Admin Asc' },
    { value: 'status_desc', label: 'Status Desc' },
    { value: 'status_asc', label: 'Status Asc' }
  ];

  submissionDateStart: string = "";
  submissionDateEnd: string = "";
  approvalDateStart: string = "";
  approvalDateEnd: string = "";

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, {static: true}) sort: MatSort | undefined;

  constructor(public res: BreakpointObserver, public realEstateService: RealEstateService, public dialog: MatDialog,
    private auth: AuthService, private fb: FormBuilder, private datePipe: DatePipe
  ) {
    super(res);
  }

  filterForm = new FormGroup({
    // user: new FormControl(),
    admin: new FormControl(),
    status: new FormControl(),
    sort: new FormControl()
  });

  override ngOnInit(): void {
    this.loggedUserRoles = this.auth.getRoles()
    this.loggedUserId = this.auth.getLoggedUserId()

    if (this.loggedUserRoles.includes("CUSTOMER")) {
      this.fetchCustomerData()
    }
    if (this.loggedUserRoles.includes("SUPERADMIN") || this.loggedUserRoles.includes("SUPER_ADMIN")) {
      this.fetchAdminData();
    }
  }

  fetchAdminData() {
    this.displayedColumns = ['submissionDate','address', 'floorNumber', 'documents', 'username', 'status', 'accept', 'decline'];
    
    this.auth.getUserById(this.loggedUserId).subscribe(
      data => {
        this.admin = data
        console.log("admin", this.admin)
      },
      error => {
        console.log("NAY");
      }
    )

    this.realEstateService.getPendingRequests().subscribe(
      data => {
        console.log(data)
        this.requests = data;
        this.dataSource = new MatTableDataSource<Request>(this.requests);
        // this.dataSource.paginator = this.paginator!;
        this.dataSource.sort = this.sort!;
      },
      error => {
        console.log("NAY");
      }
    )
  }

  fetchCustomerData() {
    console.log("customer")
    this.displayedColumns =  ['submissionDate', 'approvalDate','address', 'floorNumber', 'documents', 'adminn', 'status'];

    this.realEstateService.getUserRequests(this.loggedUserId, this.filterForm.value.admin, this.filterForm.value.status,
      this.submissionDateStart, this.submissionDateEnd, this.approvalDateStart, this.approvalDateEnd, this.filterForm.value.sort
    ).subscribe(
      data => {
        console.log(data)
        this.requests = data;
        this.dataSource = new MatTableDataSource<Request>(this.requests);
        // this.dataSource.paginator = this.paginator!;
        this.dataSource.sort = this.sort!;
      },
      error => {
        console.log("NAY");
      }
    )
  }

  viewDocument(doc: string): void {
    console.log(`Viewing document: ${doc}`);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case RequestStatus[0]:
        return 'Approved';
      case RequestStatus[1]:
        return 'Declined';
      case RequestStatus[2]:
        return 'Pending';
      default:
        return '';
    }
  }

  acceptRequest(request: Request) {
    request.admin = this.admin

    this.realEstateService.accept(request).subscribe(
      data => {
        console.log("success")
        this.ngOnInit()
      },
      error => {
        console.log("NAY");
      }
    )
  }

  declineRequest(request: Request) {
    const dialogRef = this.dialog.open(RequestDeclineDialogComponent, {
        // data: user,
        panelClass: 'no-radius-dialog',
    }).afterClosed().subscribe((result) => {
      this.reasoning = result
      this.sendRequest(request);
      console.log('Input iz dijaloga:', result);
    })
  }

  sendRequest(request: Request) {
    request.reasoning = this.reasoning
    request.admin = this.admin

    console.log("requesttt", request)
    
    this.realEstateService.decline(request).subscribe(
      data => {
        console.log("success")
        this.ngOnInit()
      },
      error => {
        console.log("NAY");
      }
    )
  }

  getFormatedDate(date: Date, format: string) {
    return this.datePipe.transform(date, format);
  }

  submissionDateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    if (dateRangeStart.value && dateRangeEnd.value) {
      this.submissionDateStart = this.getFormatedDate(new Date(dateRangeStart.value), "yyyy-MM-dd")!;
      this.submissionDateEnd = this.getFormatedDate(new Date(dateRangeEnd.value), "yyyy-MM-dd")!;
    } else {
      this.submissionDateStart = "";
      this.submissionDateEnd = "";
    }
  }

  approvalDateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    if (dateRangeStart.value && dateRangeEnd.value) {
      this.approvalDateStart = this.getFormatedDate(new Date(dateRangeStart.value), "yyyy-MM-dd")!;
      this.approvalDateEnd = this.getFormatedDate(new Date(dateRangeEnd.value), "yyyy-MM-dd")!;
    } else {
      this.approvalDateStart = "";
      this.approvalDateEnd = "";
    }
  }

  filterClicked() {
    console.log("sort ", this.filterForm.value.sort)
    this.ngOnInit()
  }
}

