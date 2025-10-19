import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";

@Component({
    "template": ""
})
export class ResponsiveComponent implements OnInit {

  isXSmall = false;
  isSmall = false;
  isMedium = false;
  isLarge = false;
  isXLarge = false;

  constructor(public responsive: BreakpointObserver) {

  }
  
  ngOnInit() {
  
    this.responsive.observe(Breakpoints.XSmall)
      .subscribe(result => {
        this.isXSmall = false; 
        if (result.matches) {
          this.isXSmall = true;
        }
    });
    
    this.responsive.observe(Breakpoints.Small)
      .subscribe(result => {
        this.isSmall = false; 
        if (result.matches) {
          this.isSmall = true;
        }
    });

    this.responsive.observe(Breakpoints.Medium)
      .subscribe(result => {
        this.isMedium = false; 
        if (result.matches) {
          this.isMedium = true;
        }
    });

    this.responsive.observe([Breakpoints.Large, Breakpoints.XLarge])
      .subscribe(result => {
        // We can add an XLarge property if we decide to support 4k monitors
        this.isLarge = false; 
        if (result.matches) {
          this.isLarge = true;
        }
    });

  }
}