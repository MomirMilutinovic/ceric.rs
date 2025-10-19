import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-from/user-registration-form.component';
import { User, UserManagementService } from '../user-management.service';
import { ApiUrls } from '../../shared/api-urls.enum';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.css',
})
export class AddUserDialogComponent implements AfterViewInit {
  @ViewChild('form')
  userRegistrationFrom!: UserRegistrationFormComponent;
  canSubmit = false;
  user!: User;

  constructor(
    private userManagementService: UserManagementService,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private snackBar: MatSnackBar,
  ) {}

  ngAfterViewInit(): void {
    this.userRegistrationFrom.isValid.subscribe((isValid) => {
      this.canSubmit = isValid;
    });
    this.userRegistrationFrom.user.subscribe((user) => (this.user = user));
  }

  addUser() {
    this.userManagementService.addUser(this.user).subscribe((_) => {
      // TODO: Add error messages
      this.snackBar.open("User added successfully.");
      this.dialogRef.close();
    });
  }
}
