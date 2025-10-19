import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { UserTableComponent } from '../user-table/user-table.component';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { AuthService } from '../../auth/service/auth.service';

interface RoleOption {
  value: string,
  viewValue: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements AfterViewInit {
  @ViewChild('table') table!: UserTableComponent;
  searchQueryChanged: Subject<string> = new Subject<string>();
  roleChanged: Subject<string> = new Subject<string>();
  roles: RoleOption[] = [
    {value: "", viewValue: "Any"},
    {value: "ADMIN", viewValue: "Admin"},
    {value: "CLERK", viewValue: "Clerk"},
    {value: "CUSTOMER", viewValue: "Customer"},
  ];

  isNotSuperAdmin: boolean = false;

  constructor(private dialog: MatDialog, private auth: AuthService) {
    this.isNotSuperAdmin = !auth.getRoles().includes("SUPER_ADMIN");
  }

  ngAfterViewInit(): void {
    this.subscribeAndDebounceFilterChanges(this.searchQueryChanged, this.table.dataSource.searchQuery$);
    this.subscribeAndDebounceFilterChanges(this.roleChanged, this.table.dataSource.roleFilter$);
  }

  subscribeAndDebounceFilterChanges(filter: Subject<string>, debouncedOutput: BehaviorSubject<string>) {
    const debounceDelay = 1000;
    filter
      .asObservable()
      .pipe(debounceTime(debounceDelay), distinctUntilChanged())
      .subscribe((value) =>
        debouncedOutput.next(value)
      );
  }

  updateSearchQuery(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchQueryChanged.next(filterValue.trim().toLowerCase());
  }

  updateRoleFilter(event: MatSelectChange) {
    const filterValue = event.value;
    this.roleChanged.next(filterValue);
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: "80%",
      backdropClass: "backdropBackground"
    });
  }
}
