import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ResponsiveComponent } from '../../shared/responsive-component.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-request-decline-dialog',
  templateUrl: './request-decline-dialog.component.html',
  styleUrl: './request-decline-dialog.component.css'
})
export class RequestDeclineDialogComponent extends ResponsiveComponent{
  inputData: string = '';

  constructor(
    public dialogRef: MatDialogRef<RequestDeclineDialogComponent>, public res: BreakpointObserver
  ) { super(res); }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  submit(): void {
    this.dialogRef.close(this.inputData);
  }
}
